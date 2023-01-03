import { extname } from "path";
import * as vscode from "vscode";

async function isUnsafeSafeFile(fileName: string): Promise<boolean> {
  const unsafeLanguages = [
    ".ts",
    ".py",
    ".rb",
    ".php",
    ".c",
    ".cpp",
    ".java",
    ".swift",
    ".go",
  ];

  // if extension is not found, language is safe
  if (unsafeLanguages.indexOf(extname(fileName)) >= 0) {
    return true;
  } else {
    return false;
  }
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("closenotjs.start", async () => {
      const fileName = vscode.window.activeTextEditor?.document.fileName;

      if(fileName){
       vscode.window.showInformationMessage("focus on browser"); 
      }
      if (fileName && (await isUnsafeSafeFile(fileName))) {
        await vscode.commands.executeCommand(
          "workbench.action.closeActiveEditor"
        );
      } else if (fileName && !(await isUnsafeSafeFile(fileName))) {
      }
    })
  );
}

export function deactivate() {}
