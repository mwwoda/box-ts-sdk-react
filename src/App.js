import "./App.css";
import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import { BoxClient, BoxDeveloperTokenAuth } from "box-typescript-sdk-gen";

function App() {
  const [items, setItems] = React.useState([]);
  const [client, setClient] = React.useState(null);

  let updateToken = (value) => {
    let auth = new BoxDeveloperTokenAuth({
      token: value.target.value,
    });
    let boxClient = new BoxClient({ auth });
    setClient(boxClient);
  };

  let getFiles = async (folderId) => {
    if (client === null) {
      alert("Please enter a developer token");
      return;
    }
    let entries = (await client.folders.getFolderItems(folderId)).entries;
    setItems(entries);
  };

  let downloadFile = async (fileId) => {
    const fileInfo = await client.files.getFileById(fileId);
    const byteStream = await client.downloads.downloadFile(fileId);
    const destHandler = await window
      .showSaveFilePicker({
        suggestedName: fileInfo.name,
      })
      .catch((err) => {
        // The user cancelled the save prompt
        console.log(err);
      });
    if (destHandler === undefined) {
      return;
    }
    const writableStream = await destHandler.createWritable();
    byteStream.pipeTo(writableStream);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TextField
          label="Developer Token"
          variant="outlined"
          onChange={updateToken}
        ></TextField>
        <br />
        <Button variant="contained" onClick={() => getFiles("0")}>
          Get Root Folder
        </Button>
      </header>
      <Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={`${item.type}-${item.id}`}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  
                  <TableCell>
                    {item.type === "file" ? (
                      <button onClick={() => downloadFile(item.id)}>
                        Download
                      </button>
                    ) : item.type === "folder" ? (
                      <button onClick={() => getFiles(item.id)}>Open</button>
                    ) : item.type === "web_link" ? (
                      <a href={item.url} target="_blank" rel="noreferrer">
                        <button>Open</button>
                      </a>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default App;
