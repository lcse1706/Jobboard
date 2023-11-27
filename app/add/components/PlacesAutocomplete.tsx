import { useEffect, useState } from "react";

import usePlacesAutocomplete from "use-places-autocomplete";

export const PlacesAutocomplete = ({
  onAddressSelect,
  isSubmitted,
}: {
  isSubmitted?: boolean;
  onAddressSelect?: (address: string) => void;
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
    cache: 86400,
  });

  const [error, setError] = useState(false);

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
          }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  useEffect(() => {
    if (isSubmitted) {
      if (!value) {
        setError(true);
        return;
      }
      setValue("");
    }
  }, [isSubmitted]);

  return (
    <div>
      <input
        value={value}
        className="w-full mb-2 p-2 border rounded"
        disabled={!ready}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Location"
      />

      {error && <p className="text-red-500 mb-3">Field cannot be empty</p>}

      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
