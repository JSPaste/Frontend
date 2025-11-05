import { useNavigate } from "@solidjs/router";
import { IconFileFilled, IconSettingsFilled, IconUpload } from "@tabler/icons-solidjs";
import { createSignal, type JSXElement } from "solid-js";
import NavbarButton from "#component/NavbarButton.tsx";
import { getEditorContext } from "#util/getEditorContext.ts";
import { client } from "#util/library.ts";
import { LogSource, logger } from "#util/logger.ts";
import { editorContent } from "#util/persistence.ts";

export default function Navbar(): JSXElement {
  const navigate = useNavigate();
  const ctx = getEditorContext();

  const [isUploading, setIsUploading] = createSignal(false);

  const handleUpload = async (): Promise<void> => {
    const content = editorContent();

    if (content.trim() === "") {
      // biome-ignore lint/suspicious/noAlert: Still experimental
      alert("Nothing to upload.");
      return;
    }

    // biome-ignore lint/suspicious/noAlert: Still experimental
    const confirmed = confirm(
      "Uploading from the editor is considered experimental and its contents might get corrupted. Want to proceed?"
    );

    if (confirmed) {
      setIsUploading(true);

      try {
        // FIXME: Handle HTTP errors inside library
        const result = await client().publish(content);

        if (result) {
          // biome-ignore lint/suspicious/noAlert: Still experimental
          alert(`OK!\nKey: ${result.key}\nSecret: ${result.secret}`);
          navigate(`/${result.key}`);
        } else {
          // biome-ignore lint/suspicious/noAlert: Still experimental
          alert("Failed to upload document.");
        }
      } catch (error) {
        logger.error(LogSource.Backend, error);
        // biome-ignore lint/suspicious/noAlert: Still experimental
        alert("Failed to upload document.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div class="fixed bg-base-100 p-2 flex portrait:bottom-0 portrait:w-full portrait:justify-around landscape:left-0 landscape:h-svh landscape:w-20 landscape:flex-col landscape:gap-4">
      <NavbarButton icon={<IconFileFilled size={20} />} label="New" onClick={(): void => navigate("/")} />
      <NavbarButton
        disabled={isUploading() && !ctx.editable()}
        highlight={true}
        icon={<IconUpload size={20} />}
        label={isUploading() ? "Uploading..." : "Upload"}
        onClick={handleUpload}
      />
      <span class="portrait:hidden landscape:grow" />
      <NavbarButton
        icon={<IconSettingsFilled size={20} />}
        label="Settings"
        onClick={(): void => (document.getElementById("modal_settings") as HTMLDialogElement).showModal()}
      />
    </div>
  );
}
