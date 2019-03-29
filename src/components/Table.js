import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Table = ({ headings, rows }) => {
  return (
    <TableContainer>
      <tbody>
        <tr>
          {headings.map(heading => (
            <Heading>{heading}</Heading>
          ))}
        </tr>
        {rows.map(row => (
          <tr>
            {row.map(value => (
              <Data>{value}</Data>
            ))}
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};

Table.propTypes = {
  headings: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
};

export default Table;

const TableContainer = styled.table`
  border-collapse: collapse;
  color: white;
  margin: 1rem;

  th,
  td {
    border: 1px solid #d8b222;
    padding: 1rem;
    text-align: center;
  }
`;
const Heading = styled.th`
  font-family: "Lato", sans-serif;
  font-size: 1.25rem;
`;

const Data = styled.td`
  font-family: "Raleway", sans-serif;
`;
