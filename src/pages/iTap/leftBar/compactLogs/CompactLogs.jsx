import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import '../spinner.scss'

// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

function createData(date, body, depth, limit, relations, type) {
  return {
    date,
    body,
    depth,
    limit,
    relations,
    type,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="right">{row.body}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Данные
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Лимит</TableCell>
                    <TableCell align="right">Уровень</TableCell>
                    <TableCell>Связи</TableCell>
                    <TableCell align="right">Тип</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.limit}</TableCell>
                    <TableCell align="right">{row.depth}</TableCell>
                    <TableCell>{row.relations}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const rows = [
  createData('25.10.2023', '040205551504', '1', '20', 'BERKUT', 'flfl'),
];

export default function CompactLogs() {
  return (
    <div className="history-loader-wrapper">
        <span class="history-loader"></span>
        <a>Подождите...</a>
    </div> 
    // <TableContainer component={Paper} style={{background: '#F2F0EE', boxShadow: 'none'}}>
    //   <Table aria-label="collapsible table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell />
    //         <TableCell>Дата</TableCell>
    //         <TableCell align="right">Запрос</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row) => (
    //         <Row key={row.date} row={row} />
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}