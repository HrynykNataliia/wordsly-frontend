import React from 'react';
import { useSelector } from 'react-redux';
import { subjectsSelectors } from '../../store/subject';
import { Header } from '../Header/Header';
import './SubjectsPage.scss';

export const SubjectsPage: React.FC = () => {
  const subjects = useSelector(subjectsSelectors.getSubjects);

  return (
    <div>
      <div className="subjects__header">
        <Header />
      </div>

      <div className="subjects__container columns">
        <div className="column is-half">
          <table className="table is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Subject</th>
                <th>
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(subject => {
                return (
                  <tr key={subject.id}>
                    <td>{subject.subject}</td>
                    <td>
                      <a
                        href="/"
                        className="subjects__table-button"
                        onClick={(() => {})}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="column">
          <div className="subjects__new-subject-container">
            <input
              type="text"
              placeholder="Enter a new subject"
              value=""
              onChange={() => {}}
              className="subjects__input input is-rounded has-text-weight-light is-medium"
            />

            <button
              type="button"
              onClick={() => {}}
              className="subjects__add button is-rounded is-medium"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
