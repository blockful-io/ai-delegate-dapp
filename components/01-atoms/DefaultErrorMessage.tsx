export const DefaultErrorMessage = () => {
  return (
    <div className="inline space-x-1">
      <p className="inline">We had an error while loading data, please</p>
      <a
        href="https://github.com/blockful-io/ai-delegates/issues"
        className="underline inline"
        target="_blank"
      >
        contact us
      </a>
    </div>
  );
};
