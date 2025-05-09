import { useDispatch, useSelector } from "react-redux";
import { setText } from "../redux/slices/translateSlice";
import Loader from "./Loader";

const TextContainer = () => {
  const dispatch = useDispatch();

  const { translatedText, textToTranslate, isLoading } = useSelector(
    (store) => store.translate
  );

  return (
    <div className="flex gap-3 mt-5 md:gap-[105px] max-md:flex-col">
      <div className="flex-1">
        <textarea
          value={textToTranslate}
          className="w-full min-h-[250px] max-h-[500px] text-black text-[20px] rounded p-[10px] bg-zinc-200"
          onChange={(e) => dispatch(setText(e.target.value))}
        ></textarea>
      </div>

      <div className="relative flex-1">
        <textarea
          value={translatedText}
          className="w-full min-h-[250px] max-h-[500px] text-[20px] rounded p-[10px] bg-zinc-800 text-zinc-200"
          disabled
        ></textarea>

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default TextContainer;
