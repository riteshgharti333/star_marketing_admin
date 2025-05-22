const SizeRec = ({ isDarkMode,h,w }) => {
  return (
    <p className={`${isDarkMode ? "text-white" : "text-black"} text-center my-5`}>
      Recommended size: {w} x {h}
    </p>
  );
};

export default SizeRec;
