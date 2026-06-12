import { useState, useEffect } from "react";
import { DeleteIcon } from "@/shared";
import GenericButton from "@/shared/ui/GenericButton";
import { GenericInput } from "@/shared/ui/GenericInput";
import Image from "next/image";
import { useMe, useUpdateProfile } from "@/features/auth/model/authHooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

const AdminProfile = () => {
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const { data: profile } = useMe();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const fullName = profile?.data.name || "";
  const [firstName = "", ...rest] = fullName.trim().split(" ");
  const lastName = rest.join(" ");

  // The backend avatar_url has a bug: it concatenates "avatar" + filename without a "/"
  // e.g. "/public/storage/avatarfilename.jpg" instead of "/public/storage/avatar/filename.jpg"
  // We fix it by detecting and correcting this at runtime.
  const fixAvatarUrl = (url: string | undefined | null): string => {
    if (!url) return "/noImage.jpg";
    // Insert "/" between "avatar" prefix and the filename if missing
    return url.replace(/\/avatar([^/])/, "/avatar/$1");
  };

  const avatarSrc = previewUrl || fixAvatarUrl(profile?.data?.avatar_url);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: {
      firstName: profile?.data?.firstName || firstName,
      lastName: profile?.data?.lastName || lastName,
      phoneNumber: profile?.data?.phone_number || "",
      image: profile?.data?.avatar,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", `${data.firstName} ${data.lastName}`.trim());
      formData.append("phone_number", data.phoneNumber);

      if (data.image && data.image instanceof FileList && data.image.length > 0) {
        formData.append("image", data.image[0]);
      } else if (data.image === null) {
        formData.append("image", "");
      }

      const res: any = await updateProfile(formData);
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      toast.success(res?.message || "Successfully updated");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    }
  };

  const handleDeleteImage = () => {
    setValue("image", null);
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  return (
    <div>
      <h1 className="text-center sm:text-left text-xl text-textPrimary font-bold leading-[120%] tracking-[0.006rem]">
        Admin info
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 mt-6"
      >
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Image
              src={avatarSrc}
              alt="Admin"
              width={156}
              height={156}
              loading="eager"
              className="rounded-full h-39 object-cover"
            />

            <div className="flex flex-row sm:flex-col gap-2">
              <GenericInput
                type="file"
                className="flex justify-center items-center rounded-lg bg-[#F6F8FA] w-8 h-8"
                {...register("image", {
                  onChange: (e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      const file = files[0];
                      if (previewUrl && previewUrl.startsWith("blob:")) {
                        URL.revokeObjectURL(previewUrl);
                      }
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }
                })}
              />

              <button
                type="button"
                onClick={handleDeleteImage}
                className="flex items-center justify-center w-8 h-8 rounded-lg p-2 bg-[#F6F8FA] hover:bg-red-50 text-red-500 transition-colors"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GenericInput
              type="text"
              placeholder={firstName || "First Name"}
              label="First Name"
              fullWidth
              size="xmd"
              labelClassName="text-grayBlack2 font-normal text-sm leading-[100%] mb-2"
              error={errors.firstName?.message}
              {...register("firstName")}
            />

            <GenericInput
              type="text"
              placeholder={lastName || "Last Name"}
              label="Last Name"
              fullWidth
              size="xmd"
              labelClassName="text-grayBlack2 font-normal text-sm leading-[100%] mb-2"
              error={errors.lastName?.message}
              {...register("lastName")}
            />

            <GenericInput
              type="email"
              placeholder={profile?.data.email || "admin@gmail.com"}
              label="Email"
              fullWidth
              disabled
              size="xmd"
              labelClassName="text-grayBlack2 font-normal text-sm leading-[100%] mb-2"
            />

            <GenericInput
              type="tel"
              placeholder={profile?.data?.phone_number}
              label="Phone"
              fullWidth
              size="xmd"
              error={errors.phoneNumber?.message}
              labelClassName="text-grayBlack2 font-normal text-sm leading-[100%] mb-2"
              {...register("phoneNumber")}
            />
          </div>
        </div>

        <div className="flex justify-end mt-3 sm:mt-8">
          <GenericButton
            title={isPending ? "Updating..." : "Update info"}
            type="submit"
            disabled={isPending}
            size="mlarge"
            className="w-full sm:w-auto"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
