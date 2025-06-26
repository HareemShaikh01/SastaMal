import React from 'react';

const Specifications = ({ formData, errors, handleChange, addAdditionalInfo, removeAdditionalInfo }) => {
    return (
        <section>
            <h2 className="mb-4 fs-4 fs-md-3 border-bottom pb-2">Specifications</h2>
            {errors.additionalInfo && (
                <div className="alert alert-danger mb-3">{errors.additionalInfo}</div>
            )}

            <div className="card p-3 mb-3 bg-white">
                <div className="row g-2">
                    <div className="col-md-5">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Specification (e.g., Material)"
                            name="key"
                            value={formData.key}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Value (e.g., 100% Cotton)"
                            name="value"
                            value={formData.value}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={addAdditionalInfo}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            {/* Specifications List */}
            {formData.additionalInfo.length > 0 && (
                <div className="mb-4">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th width="40%">Specification</th>
                                    <th width="50%">Value</th>
                                    <th width="10%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.additionalInfo.map((info, index) => (
                                    <tr key={index}>
                                        <td>{info.key}</td>
                                        <td>{info.value}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                                onClick={() => removeAdditionalInfo(index)}
                                            >
                                                ×
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Specifications;
