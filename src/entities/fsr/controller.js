import db from '../../database';
var SqlString = require('sqlstring');

// gets all approved fsr
export const getApprovedFSR = () => {
  return new Promise((resolve, reject) => {
    const queryString = `
        SELECT 
            *
        FROM 
            EMPLOYEE a, 
            EMPLOYEE_FSR b
        WHERE
            a.emp_id = b.emp_id
        AND
            a.type = "FACULTY"
    `;

    db.query(queryString, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return resolve(null);
      }

      return resolve(rows);
    });
  });
};

// search an approved fsr by name
export const getApprovedByName = ({ name }) => {
  return new Promise((resolve, reject) => {
    const values = [name, name, name];
    const queryString = SqlString.format(
      `
        SELECT 
            a.*
        FROM 
            EMPLOYEE a, 
            EMPLOYEE_FSR b
        WHERE
            a.emp_id = b.emp_id
        AND
            a.type = "FACULTY"
        AND
            (a.f_name = ? OR
            a.m_name = ? OR
            a.l_name = ?);
        `,
      values
    );

    db.query(queryString, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return resolve(null);
      }

      return resolve(rows);
    });
  });
};

// search an approved fsr by id
export const getApprovedById = ({ empid }) => {
  return new Promise((resolve, reject) => {
    const queryString = SqlString.format(
      `
        SELECT 
            a.*
        FROM 
            EMPLOYEE a, 
            EMPLOYEE_FSR b
        WHERE
            a.emp_id = b.emp_id
        AND
            a.type = "FACULTY"
        AND
            a.emp_id = ?
    `,
      [empid]
    );

    db.query(queryString, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return resolve(null);
      }

      return resolve(rows);
    });
  });
};

// gets all pending FSR
export const getPendingFSR = () => {
  return new Promise((resolve, reject) => {
    const queryString = `
    SELECT 
        *
    FROM 
        EMPLOYEE
    WHERE
        is_being_approved = 1
    AND
        type = "FACULTY";
    `;

    db.query(queryString, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return resolve(null);
      }

      return resolve(rows);
    });
  });
};

// search a pending fsr by name
export const getPendingByName = ({ name }) => {
  return new Promise((resolve, reject) => {
    const values = [name, name, name];
    const queryString = SqlString.format(
      `
        SELECT 
            *
        FROM 
          (SELECT * FROM EMPLOYEE WHERE is_being_approved = 1 AND type = "FACULTY") AS PENDING
        WHERE
            PENDING.f_name = ? OR PENDING.m_name = ? OR PENDING.l_name = ?;
        `,
      values
    );

    db.query(queryString, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return resolve(null);
      }

      return resolve(rows);
    });
  });
};

// search a pending fsr by id
export const getPendingById = ({ empid }) => {
  return new Promise((resolve, reject) => {
    const queryString = SqlString.format(
      `
        SELECT 
          *
        FROM 
          EMPLOYEE
        WHERE
          is_being_approved = 1
        AND
          type = "FACULTY"
        AND
          emp_id = ?
    `,
      [empid]
    );

    db.query(queryString, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return resolve(null);
      }

      return resolve(rows);
    });
  });
};

// sends fsr to admin
export const sendToAdmin = ({ empid }) => {
  return new Promise((resolve, reject) => {
    const queryString = SqlString.format(
      `
      UPDATE EMPLOYEE
      SET
        is_being_approved = 1
      WHERE
        emp_id = ?
    `,
      [empid]
    );

    db.query(queryString, (err, res) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!res.affectedRows) {
        return reject(404);
      }

      return resolve();
    });
  });
};

// rejects fsr
export const rejectFSR = ({ empid }) => {
  return new Promise((resolve, reject) => {
    const queryString = SqlString.format(
      `
      UPDATE EMPLOYEE
      SET
        is_being_approved = 0
      WHERE
        emp_id = ?
    `,
      [empid]
    );

    db.query(queryString, (err, res) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!res.affectedRows) {
        return reject(404);
      }

      return resolve();
    });
  });
};
