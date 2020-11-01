import React from 'react';
import style from './formField.css';

const FormField = ({ formdata, change, id }) => {

    const showError = () => {
        let errorMessage = null;
        if(formdata.validation && !formdata.valid) {
            errorMessage = (
                <div className={style.labelError}>
                    {formdata.validationMessage}
                </div>
            )
        }
        return errorMessage
    }

    const renderTemplate = () => {
        let formTemplate = null;
        switch(formdata.element) {
            case ('input'): 
                formTemplate = (
                    <div>
                        <input 
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({event, id, blur: true})}
                            onChange={(event) => change({event, id, blur: false})}
                        />
                        {showError()}
                    </div>
                )
                break;
            case ('select'):
                formTemplate = (
                    <select
                        value={formdata.value}
                        name={formdata.config.name}
                        onBlur={(event) => change({event, id, blur: true})}
                        onChange={(event) => change({event, id, blur: false})}
                    >
                        {formdata.config.options.map((item, i)=>(
                            <option key={i} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                )
                break;
            default: 
                formTemplate = null;
        }
        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;