import { GraphQLError } from "graphql";
import { Countries, GET_COUNTRIES } from "./Countries";
import { MockedProvider } from "@apollo/client/testing";

const countries = [
  {
    __typename: "Country",
    name: "Australia",
    capital: "Canberra",
    emoji: "🇦🇺",
    languages: [{ __typename: "Language", name: "English", code: "en" }],
    awsRegion: "ap-southeast-2",
  },
  {
    __typename: "Country",
    name: "United States",
    capital: "Washington D.C.",
    emoji: "🇺🇸",
    languages: [{ __typename: "Language", name: "English", code: "en" }],
    awsRegion: "us-east-2",
  },
  {
    __typename: "Country",
    name: "Switzerland",
    capital: "Bern",
    emoji: "🇨🇭",
    languages: [
      {
        name: "German",
        code: "de",
      },
      {
        name: "French",
        code: "fr",
      },
      {
        name: "Italian",
        code: "it",
      },
    ],
    awsRegion: "eu-south-1",
  },
];

describe("<Countries />", () => {
  it("fetches and renders data", () => {
    cy.mount(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_COUNTRIES,
            },
            result: {
              data: {
                countries,
              },
            },
            delay: 250,
          },
        ]}
        addTypename={false}
      >
        <Countries />
      </MockedProvider>
    );

    cy.findByLabelText("Loading");

    for (const country of countries) {
      cy.contains(country.name);
      cy.contains(country.emoji);
      cy.contains(country.languages.map((x) => x.name).join(", "));
    }
  });

  it("network error", () => {
    cy.mount(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_COUNTRIES,
            },
            error: new Error("Unexpected Error!"),
          },
        ]}
        addTypename={false}
      >
        <Countries />
      </MockedProvider>
    );

    cy.findByRole("alert").contains("Unexpected Error!");
  });

  it("GraphQL error", () => {
    cy.mount(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_COUNTRIES,
            },
            result: {
              errors: [new GraphQLError("GraphQL Error!")],
            },
          },
        ]}
        addTypename={false}
      >
        <Countries />
      </MockedProvider>
    );

    cy.findByRole("alert").contains("GraphQL Error!");
  });
});
