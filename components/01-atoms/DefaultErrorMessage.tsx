export const DefaultErrorMessage = () => {
  return (
    <div
      className="block space-x-1 p-4 rounded-xl"
      style={{
        border: "1px solid #FF0000",
      }}
    >
      <p className="inline">We had an error while loading data, please</p>
      <a
        href="https://github.com/blockful-io/ai-delegates/issues"
        className="underline inline"
        target="_blank"
      >
        contact us.
      </a>
    </div>
  );
};
