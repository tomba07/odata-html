// renderHelpers.js
import metadata from "./data/metadata.js";
import Handlebars from "handlebars";
import fs from "fs";

// Load your Handlebars templates from the file system
// Assuming the templates are in the 'templates' directory and have a '.handlebars' extension
const templates = {
  collectionFacetTemplate: Handlebars.compile(fs.readFileSync("./templates/collectionFacetTemplate.handlebars", "utf-8")),
  dataFieldTemplate: Handlebars.compile(fs.readFileSync("./templates/dataFieldTemplate.handlebars", "utf-8")),
  fieldGroupTemplate: Handlebars.compile(fs.readFileSync("./templates/fieldGroupTemplate.handlebars", "utf-8")),
  dataPointTemplate: Handlebars.compile(fs.readFileSync("./templates/dataPointTemplate.handlebars", "utf-8")),
  lineItemTemplate: Handlebars.compile(fs.readFileSync("./templates/lineItemTemplate.handlebars", "utf-8"))
};

// Modify renderLineItemFacet to include general information using renderFieldGroupFacet
const renderLineItemFacet = (referenceFacet, data, definitions, targetPath) => {
  const dataKey = targetPath[0];
  const dataSet = data[dataKey];
  const entitySet = definitions.elements[dataKey].target;
  const lineItemDefinitions = metadata.definitions[entitySet];
  const lineItemDefinition = lineItemDefinitions["@UI.LineItem#BookOrders"];
  const generalInfoDefinition = lineItemDefinitions["@UI.Facets"].find((facet) => facet.ID === "GeneralInformation");
  const maxColumns = 5;
  const headers = lineItemDefinition.slice(0, maxColumns).map((fieldDef) => fieldDef.Label);

  // Prepare the items and columns for the template
  const items = dataSet.map((item) => {
    const itemData = {};
    const transposed = [];

    // Go through each field definition and organize the data accordingly
    lineItemDefinition.forEach((fieldDef, index) => {
      const value = item[fieldDef.Value["="]];
      if (index < maxColumns) {
        // These will be the columns displayed in the main row
        itemData[fieldDef.Label] = value;
      } else {
        // These will be transposed into additional rows
        transposed.push({ label: fieldDef.Label, value });
      }
    });
    // Use renderFieldGroupFacet to render the general information fields
    const generalInformationHtml = renderFieldGroupFacet(generalInfoDefinition, item, lineItemDefinitions, generalInfoDefinition.Target);

    // Return both the main row data and the transposed data along with general information
    return { data: itemData, transposed, generalInformationHtml };
  });

  return templates.lineItemTemplate({
    key: referenceFacet.ID,
    headers,
    items,
    maxColumns
  });
};

// Function to process FieldGroup facets
const renderFieldGroupFacet = (referenceFacet, data, definitions, targetKey) => {
  const targetData = definitions[`${targetKey}.Data`];
  const fields = renderFieldGroup(targetData, data);

  return templates.fieldGroupTemplate({
    key: referenceFacet.ID,
    label: referenceFacet.Label,
    fields: fields
  });
};

// Function to render fields inside a FieldGroup
const renderFieldGroup = (fieldGroupData, data) => {
  return fieldGroupData.map((dataField) => {
    return templates.dataFieldTemplate({
      label: dataField.Label,
      value: data[dataField.Value["="]]
    });
  });
};

// Function to process DataPoint facets
const renderDataPointFacet = (referenceFacet, data, definitions, targetKey) => {
  const targetTitle = definitions[`${targetKey}.Title`];
  const targetValue = definitions[`${targetKey}.Value`]["="];
  const dataValue = data[targetValue];

  return templates.dataPointTemplate({
    key: referenceFacet.ID,
    title: targetTitle,
    value: dataValue
  });
};

// Function to recursively render facets
const renderFacets = (facets, data, definitions, entityName) => {
  // Ensure we always work with an array, hence `map` will always return an array
  return facets
    .map((facet) => {
      const targetKey = `${facet.Target}`;
      const targetType = definitions[`${targetKey}.$Type`];
      const targetPath = targetKey.split("/");

      // Each case should return a string
      switch (facet.$Type) {
        case "UI.ReferenceFacet":
          if (targetPath.length > 1 && data.hasOwnProperty(targetPath[0])) {
            return renderLineItemFacet(facet, data, definitions, targetPath); // ensure this returns a string
          } else if (targetType === "UI.FieldGroupType") {
            return renderFieldGroupFacet(facet, data, definitions, targetKey); // ensure this returns a string
          } else {
            return renderDataPointFacet(facet, data, definitions, targetKey); // ensure this returns a string
          }
        case "UI.CollectionFacet":
          // Ensure that renderFacets call is concatenated properly
          const childElements = renderFacets(facet.Facets, data, definitions, entityName);
          return templates.collectionFacetTemplate({
            key: facet.ID,
            label: facet.Label,
            children: childElements // join the child elements here
          }); // ensure this returns a string
        // Add cases for other $Type values as needed
        default:
          return ""; // return an empty string for default
      }
    })
    .join(""); // Join the rendered HTML strings
};

// Function to initiate rendering of header facets and UI facets
const renderEntityFacets = (entityName, data, metadata) => {
  const definitions = metadata.definitions[entityName];
  const headerFacets = definitions["@UI.HeaderFacets"];
  const uiFacets = definitions["@UI.Facets"];

  const headerFacetElements = renderFacets(headerFacets, data, definitions, entityName);
  const uiFacetElements = renderFacets(uiFacets, data, definitions, entityName);

  // Combine header and UI facets into one HTML string
  return headerFacetElements + uiFacetElements;
};

export { renderEntityFacets };
