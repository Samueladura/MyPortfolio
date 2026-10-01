import { TerminalNavbar } from "./components/TerminalNavbar";
import { TerminalHero } from "./components/TerminalHero";
// import { TerminalAbout } from "./components/TerminalAbout";
// import { TerminalSkills } from "./components/TerminalSkills";
import { TerminalProjects } from "./components/TerminalProjects";
import { TerminalExperience } from "./components/TerminalExperience";
import { TerminalContact } from "./components/TerminalContact";

export default function App() {
  return (
    <div
      className="min-h-screen bg-terminal-bg"
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}
    >
      <TerminalNavbar />
      <TerminalHero />
      {/* <TerminalAbout /> */}
      {/* <TerminalSkills /> */}
      <TerminalProjects />
      <TerminalExperience />
      <TerminalContact />
    </div>
  );
}
