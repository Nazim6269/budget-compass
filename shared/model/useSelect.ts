import { useMemo, useState } from "react";
import { SelectOption } from "../ui/GenericDropdown";

const useSelect = (options:SelectOption[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;

    return options.filter((opt: SelectOption) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredOptions,
  };
};

export default useSelect
