import fs from "fs";
import Handlebars from "handlebars";
import metadata from "./data/metadata.js";
import data from "./data/data.js";
import { renderEntityFacets } from "./renderHelpers.js";

// Assume that renderEntityFacets is updated to work with Handlebars
const entityName = "BookshopService.Orders";

// Prepare the data for the template
const context = {
  content: renderEntityFacets(entityName, data, metadata)
};

// Compile the template (Assuming you have a main.handlebars file as your template)
const source = fs.readFileSync("./templates/main.handlebars", "utf-8");
const template = Handlebars.compile(source);

// Generate the HTML
const html = template(context);

// Write the HTML to a file
fs.writeFile("./output.html", html, (err) => {
  if (err) {
    console.error("An error occurred:", err);
    return;
  }
  console.log("The file has been saved!");
});
