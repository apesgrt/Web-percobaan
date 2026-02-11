import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).send("Upload parse error");
    }

    const file = files.fileToUpload;

    const formData = new FormData();
    formData.append("reqtype", "fileupload");
    formData.append("userhash", "");
    formData.append(
      "fileToUpload",
      fs.createReadStream(file.filepath),
      file.originalFilename
    );

    try {
      const response = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      res.status(200).send(text);
    } catch (e) {
      res.status(500).send("Catbox upload failed");
    }
  });
}
