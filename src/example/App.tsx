import DarkModeToggle from "@/lib/components/DarkModeToggle";
import { PDFEditor } from "@/lib/components/PDFEditor";

function App() {
  return (
    <>
      {/* Dark Mode Toggle */}
      <DarkModeToggle />
      <PDFEditor />;
    </>
  );
}

export default App;
