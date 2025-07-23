import React, { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { LuArrowLeftRight, LuArrowRightLeft } from "react-icons/lu";
import { MdOutlineGppGood, MdOutlineGppBad } from "react-icons/md";

const TaskList = ({
  title,
  type,
  tasks,
  handleOnDelete,
  handleOnSwap,
  hour,
  handleOnDeleteAll,
}) => {
  const [idsToDelete, setIdsToDelete] = useState([]);

  const handleOnChange = (checked, id) => {
    let tempIds = [...idsToDelete];

    console.log(checked, id);

    if (checked) {
      tempIds.push(id);
      setIdsToDelete(tempIds);
    } else {
      tempIds = tempIds.filter((ti) => ti != id);
      setIdsToDelete(tempIds);
    }
  };
  return (
    <div className="col-12 col-md-6">
      <div className="card p-3 h-100">
        <h2>{title}</h2>
        {idsToDelete.length > 0 ? (
          <button
            className="btn btn-danger"
            onClick={() => {
              setIdsToDelete([]);
              handleOnDeleteAll(idsToDelete);
            }}
          >
            Delete All
          </button>
        ) : (
          ""
        )}
        <hr />
        <div className="card-body p-0">
          <table className="table">
            <tbody id="goodList">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-3">
                    There are no tasks in the list.
                  </td>
                </tr>
              ) : (
                tasks.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}.</th>
                      <td>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          onChange={(e) =>
                            handleOnChange(e.target.checked, item._id)
                          }
                          checked={
                            idsToDelete.find((i) => i === item._id)
                              ? true
                              : false
                          }
                        />
                      </td>
                      <td>{item.task}</td>
                      <td>{item.hour} Hrs</td>
                      <td>
                        {item.type == "good" ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => handleOnDelete(item._id)}
                            >
                              <RiDeleteBin2Fill />
                            </button>{" "}
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => {
                                handleOnSwap(item._id);
                              }}
                            >
                              <LuArrowRightLeft />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={() => handleOnSwap(item._id)}
                            >
                              <LuArrowLeftRight />
                            </button>{" "}
                            <button
                              type="button"
                              className="btn btn-danger"
                              // onclick="deleteTask('Z5zFfV')"
                              onClick={() => handleOnDelete(item._id)}
                            >
                              <RiDeleteBin2Fill />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {type == "good" ? (
          <div className="alert alert-primary" role="alert">
            You saved {hour} hours
          </div>
        ) : (
          <div className="alert alert-danger" role="alert">
            You wasted {hour} hours
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
