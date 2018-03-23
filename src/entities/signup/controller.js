import db from '../../database';



//adds an employee
export const addEmployee = ({emp_id, username, password, type, f_name, m_name, l_name, department, college, semester}) => {
  return new Promise((resolve, reject) => {
    const queryString = `
      INSERT INTO
      EMPLOYEE
      (emp_id_increment, emp_id, username, password, type, f_name, m_name, l_name, department, college, semester)
      VALUES
      (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [emp_id, username, password, type, f_name, m_name, l_name, department, college, semester];

    db.query(queryString, values, (err, results) => {
      if (err) {
        console.log(err);
        return reject(500);
      }
      
      console.log(results);
      return resolve(results.insertId);
    });
  });
};

// gets an employee
export const getEmployee = ({ id }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
          SELECT 
            *
          FROM 
            EMPLOYEE
          WHERE
            emp_id = ?;
        `;

    db.query(queryString, [id, id], (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return reject(404);
      }

      return resolve(rows[0]);
    });
  });
};
