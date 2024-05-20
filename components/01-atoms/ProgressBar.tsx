import cc from "classcat";

interface ProgressBarProps {
  currentStep: number;
  numberOfItems: number;
}
// We need status to render if it`s green or red based in status of the call
export const ProgressBar = ({ currentStep, numberOfItems }: ProgressBarProps) => {
  return (
    <div className="w-full flex items-center rounded-lg overflow-hidden">
      {Array(numberOfItems)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              key={index}
              className={cc([
                "h-2 w-full",
                {
                  "bg-[#0BB76E]": currentStep > index,
                  "bg-[#353836]": currentStep <= index,
                },
              ])}
            />
          );
        })}
    </div>
  );
};
