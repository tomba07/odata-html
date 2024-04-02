export default {
  definitions: {
    "BookshopService.Orders": {
      "@UI.HeaderFacets": [
        { $Type: "UI.ReferenceFacet", ID: "date", Target: "@UI.DataPoint#date" },
        { $Type: "UI.ReferenceFacet", ID: "cost", Target: "@UI.DataPoint#cost" },
        { $Type: "UI.ReferenceFacet", ID: "status", Target: "@UI.DataPoint#status" },
      ],
      "@UI.DataPoint#date.$Type": "UI.DataPointType",
      "@UI.DataPoint#date.Title": "Date",
      "@UI.DataPoint#date.Value": {
        "=": "date",
      },
      "@UI.DataPoint#cost.$Type": "UI.DataPointType",
      "@UI.DataPoint#cost.Title": "Total Cost",
      "@UI.DataPoint#cost.Value": {
        "=": "cost",
      },
      "@UI.DataPoint#status.$Type": "UI.DataPointType",
      "@UI.DataPoint#status.Title": "Order Status",
      "@UI.DataPoint#status.Value": {
        "=": "status",
      },
      "@UI.Facets": [
        {
          $Type: "UI.CollectionFacet",
          Label: "Order Detail",
          ID: "Details",
          Facets: [
            {
              $Type: "UI.CollectionFacet",
              ID: "Address",
              Facets: [
                {
                  $Type: "UI.ReferenceFacet",
                  Label: "From Bookshop",
                  ID: "From",
                  Target: "@UI.FieldGroup#From",
                },
                {
                  $Type: "UI.ReferenceFacet",
                  Label: "To Customer",
                  ID: "To",
                  Target: "@UI.FieldGroup#To",
                },
                {
                  $Type: "UI.ReferenceFacet",
                  Label: "Book Orders",
                  ID: "BookOrders",
                  Target: "bookOrders/@UI.LineItem#BookOrders",
                },
              ],
            },
          ],
        },
      ],
      "@UI.FieldGroup#From.$Type": "UI.FieldGroupType",
      "@UI.FieldGroup#From.Data": [
        {
          $Type: "UI.DataField",
          Value: {
            "=": "from_name",
          },
          Label: "Bookshop Name",
        },
        {
          $Type: "UI.DataField",
          Value: {
            "=": "from_address",
          },
          Label: "Bookshop Address",
        },
        {
          $Type: "UI.DataField",
          Value: {
            "=": "from_phone",
          },
          Label: "Bookshop Phone",
        },
      ],
      "@UI.FieldGroup#To.$Type": "UI.FieldGroupType",
      "@UI.FieldGroup#To.Data": [
        {
          $Type: "UI.DataField",
          Value: {
            "=": "to_name",
          },
          Label: "Customer Name",
        },
        {
          $Type: "UI.DataField",
          Value: {
            "=": "to_address",
          },
          Label: "Delivery Address",
        },
        {
          $Type: "UI.DataField",
          Value: {
            "=": "to_phone",
          },
          Label: "Customer Phone",
        },
      ],
      elements: {
        bookOrders: {
          target: "BookshopService.BookOrders",
        },
      },
    },
    "BookshopService.BookOrders": {
      "@UI.LineItem#BookOrders": [
        {
          $Type: "UI.DataField",
          Value: {
            "=": "title",
          },
          Label: "Book Title",
        },
        {
          $Type: "UI.DataField",
          Value: {
            "=": "description",
          },
          Label: "Book Description",
        },
        {
          $Type: "UI.DataField",
          Value: {
            "=": "category",
          },
          Label: "Genre",
        },
        {
          $Type: "UI.DataField",
          Value: {
            "=": "price",
          },
          Label: "Price",
        },
        {
          $Type: "UI.DataField",
          Value: {
            "=": "quantity",
          },
          Label: "Stock Quantity",
        },
        {
          $Type: "UI.DataField",
          Value: {
            "=": "supplier",
          },
          Label: "Supplier",
        },
        {
          $Type: "UI.DataField",
          Value: {
            "=": "availability",
          },
          Label: "Availability",
        },
      ],
      "@UI.Facets": [
        {
          $Type: "UI.ReferenceFacet",
          Label: "General Information",
          ID: "GeneralInformation",
          Target: "@UI.FieldGroup#GeneralInformation",
        },
        {
          $Type: "UI.ReferenceFacet",
          Label: "Shipping Options",
          ID: "ShippingOptions",
          Target: "shippingOptions/@UI.LineItem#ShippingOptions",
        },
      ],
      "@UI.FieldGroup#GeneralInformation.$Type": "UI.FieldGroupType",
      "@UI.FieldGroup#GeneralInformation.Data": [
        {
          $Type: "UI.DataField",
          Value: {
            "=": "title",
          },
          Label: "Title",
        },
        {
          $Type: "UI.DataField",
          Value: {
            "=": "description",
          },
          Label: "Description",
        },
        {
          $Type: "UI.DataField",
          Value: {
            "=": "quantity",
          },
          Label: "Quantity Available",
        },
      ],
      elements: {
        shippingOptions: {
          target: "BookshopService.ShippingOptions",
        },
      },
    },
    "BookshopService.ShippingOptions": {
      "@UI.LineItem#ShippingOptions": [
        {
          $Type: "UI.DataField",
          Value: {
            "=": "title",
          },
          Label: "Shipping Option",
        },
        {
          $Type: "UI.DataField",
          Value: {
            "=": "description",
          },
          Label: "Shipping Details",
        },
      ],
    },
  },
};
