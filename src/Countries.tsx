import { client } from "./graphql";
import { gql, useQuery } from "@apollo/client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const GET_COUNTRIES = gql`
  query GET_COUNTRIES {
    countries(filter: { code: { in: ["AU", "US"] } }) {
      __typename
      name
      capital
      emoji
      languages {
        name
        code
      }
      awsRegion
    }
  }
`;

export function Countries() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error : {error.message}</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="right">Emoji</TableCell>
            <TableCell align="right">Capital</TableCell>
            <TableCell align="right">Languages</TableCell>
            <TableCell align="right">AWS Region</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.countries.map((country: any) => (
            <TableRow
              key={country.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="country">
                {country.name}
              </TableCell>
              <TableCell align="right">{country.emoji}</TableCell>
              <TableCell align="right">{country.capital}</TableCell>
              <TableCell align="right">
                  {country.languages.map((language: any) => (
                    <span key={language.code}>{language.name}</span>
                  ))}
              </TableCell>
              <TableCell align="right">{country.awsRegion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
