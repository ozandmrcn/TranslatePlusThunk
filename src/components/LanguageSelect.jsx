import { MdOutlineCompareArrows } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setSource, setTarget, swap } from "../redux/slices/translateSlice";

const LanguageSelect = () => {
  const dispatch = useDispatch();
  const { sourceLang, targetLang } = useSelector((store) => store.translate);
  const { isLoading, languages } = useSelector((store) => store.language);

  const formatted = languages.map((language) => ({
    value: language.language,
    label: language.name,
  }));

  const detect = {
    value: undefined,
    label: "Detect language",
  };

  return (
    <div className="flex gap-2 text-black">
      <Select
        value={sourceLang}
        options={[detect, ...formatted]}
        isLoading={isLoading}
        isDisabled={isLoading}
        className="flex-1"
        onChange={(lang) => {
          const sourceValue = lang?.value;
          const targetValue = targetLang?.value;

          // Eğer Detect language seçildiyse ve dil eşleşiyorsa swap yapılır
          const isDetect =
            sourceValue === undefined || targetValue === undefined;
          const isSameRealLang = sourceValue === targetValue && !isDetect;

          if (isSameRealLang) {
            dispatch(swap());
          }

          dispatch(setSource(lang));
        }}
      />

      <button
        className="bg-zinc-700 py-2 px-6 hover:bg-zinc-800 transition rounded text-white text-xl disabled:opacity-50"
        onClick={() => {
          if (targetLang.value !== undefined) {
            dispatch(swap());
          }
        }}
        disabled={sourceLang.value === undefined}
      >
        <MdOutlineCompareArrows />
      </button>

      <Select
        value={targetLang}
        options={formatted}
        isLoading={isLoading}
        isDisabled={isLoading}
        className="flex-1"
        onChange={(lang) => {
          const sourceValue = sourceLang?.value;
          const targetValue = lang?.value;

          const isDetect =
            sourceValue === undefined || targetValue === undefined;
          const isSameRealLang = sourceValue === targetValue && !isDetect;

          if (isSameRealLang) {
            dispatch(swap());
          }

          dispatch(setTarget(lang));
        }}
      />
    </div>
  );
};

export default LanguageSelect;
