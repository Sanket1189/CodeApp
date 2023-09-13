const str1 = `using System

    class Program {
        static void Main(string[] args) {
            Console.WriteLine("Hello, world!");
        }
    } `;

const str2 = `public List<List<dynamic>> ExecuteStoredProcedure(string commandText, MySqlParameter[] parameters, params Type[] types)
    {
    List<List<dynamic>> results = new List<List<dynamic>>();

            var connection = _context.Database.GetDbConnection() as MySqlConnection;
            var command = connection.CreateCommand();
            command.CommandText = commandText;
            command.CommandType = CommandType.StoredProcedure;

            if (parameters != null && parameters.Any())
            {
            command.Parameters.AddRange(parameters);
            }

            if (command.Connection.State != ConnectionState.Open)
            {
            command.Connection.Open();
            }

            int counter = 0;
            using (var reader = command.ExecuteReader())
            {
            do
            {
            var innerResults = new List<dynamic>();

                if (counter > types.Length - 1) { break; }

                while (reader.Read())
                {
                var item = Activator.CreateInstance(types[counter]);

                for (int inc = 0; inc < reader.FieldCount; inc++) { Type type=item.GetType(); string
                    name=reader.GetName(inc); PropertyInfo property=type.GetProperty(name); if (property !=null &&
                    name==property.Name) { var value=reader.GetValue(inc); if (value !=null && value !=DBNull.Value) {
                    property.SetValue(item, Convert.ChangeType(value, Nullable.GetUnderlyingType(property.PropertyType)
                    ?? property.PropertyType)); } } } innerResults.Add(item); } results.Add(innerResults); counter++; }
                    while (reader.NextResult()); reader.Close(); } return results; }`;


const str3 = `scaffold-DbContext "server=127.0.0.1;port=3306;user=root;password=softlabs;database=world" Pomelo.EntityFrameworkCore.MySql -OutputDir Models -f


connnection string:
 "ConnectionStrings": {
    "DefaultConnection": "server=127.0.0.1; port=3306; database=world; user=root; password=softlabs; Persist Security Info=False;"
  },


IConfiguration configuration = builder.Configuration;



string mySqlConnectionStr = configuration.GetConnectionString("DefaultConnection")!;

builder.Services.AddDbContext<WorldContext>(options =>
            options.UseMySql(mySqlConnectionStr,
            ServerVersion.AutoDetect(mySqlConnectionStr)
           ));
`;

const str4 = `CREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`add_multiple_customers_test\`(json_data JSON)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE newid INT;
    DECLARE return_valid_user JSON DEFAULT JSON_ARRAY();
    DECLARE return_invalid_user NVARCHAR(10000) DEFAULT '';
    DECLARE userIdin INT;
    DECLARE userNamein VARCHAR(255);
    DECLARE firstNamein VARCHAR(255);
    DECLARE lastNamein VARCHAR(255);
    DECLARE genderin VARCHAR(10);
    DECLARE passwordin VARCHAR(255);
    DECLARE emailin VARCHAR(255);
    DECLARE email_already_present BOOLEAN;

    DECLARE user_cursor CURSOR FOR
        SELECT
            user_id,
            username,
            first_name,
            last_name,
            gender,
            password,
            email
        FROM JSON_TABLE(json_data, '$[*]' COLUMNS (
            user_id INT PATH '$.userid',
            username VARCHAR(255) PATH '$.username',
            first_name VARCHAR(50) PATH '$.firstname',
            last_name VARCHAR(50) PATH '$.lastname',
            gender VARCHAR(10) PATH '$.gender',
            password VARCHAR(50) PATH '$.password',
            email VARCHAR(255) PATH '$.email'
        )) AS user_data;

    -- Declare a NOT FOUND handler for the cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN user_cursor;

    -- Initialize newid based on existing records in the table
    SELECT IFNULL(MAX(user_id) + 1, 1) INTO newid FROM customers;

    read_loop: LOOP
        FETCH user_cursor INTO userIdin, userNamein, firstNamein, lastNamein, genderin, passwordin, emailin;

        IF done THEN
            LEAVE read_loop;
        END IF;

        SELECT COUNT(*) INTO email_already_present FROM customers WHERE email = emailin;

        IF email_already_present THEN
            SET return_invalid_user = CONCAT(return_invalid_user, username, ' , ');
        ELSE
            INSERT INTO customers (user_id, username, first_name, last_name, gender, password, email)
            VALUES (newid, userNamein, firstNamein, lastNamein, genderin, passwordin, emailin);

            SET return_valid_user = JSON_ARRAY_APPEND(return_valid_user, '$', JSON_OBJECT(
                'userid', newid,
                'username', userNamein,
                'firstname', firstNamein,
                'lastname', lastNamein,
                'gender', genderin,
                'password', passwordin,
                'email', emailin
            ));

            SET newid = newid + 1; -- Increment newid for the next record
        END IF;

    END LOOP;

    CLOSE user_cursor;

    if (select length(return_invalid_user))  >  0 && (SELECT JSON_LENGTH(return_valid_user)) > 0  then
		SELECT 'balance' AS msg;
        SELECT json_array(return_valid_user) as valid;
        SELECT return_invalid_user as invalid;
        
        
        
        
        
        
	elseif  (SELECT JSON_LENGTH(return_valid_user)) > 0 then
		SELECT 'Customers added successfully' AS msg;
        SELECT json_array(return_valid_user) as valid;
        
        
        
        
    else
		SELECT 'Customers Name Already Present' AS msg;
        SELECT return_invalid_user as valid;
    end if ;
    
END`;

const str5 = `CREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`add_images\`(json_data JSON)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE num_items INT;
    DECLARE user_id INT;
    DECLARE user_name VARCHAR(255);
    DECLARE user_url VARCHAR(255);
    
    DECLARE return_valid_user JSON DEFAULT JSON_ARRAY();
    DECLARE return_invalid_user VARCHAR(1000) DEFAULT '';
    DECLARE name_already_present BOOLEAN;
    declare newid int default 0 ;

    SET num_items = JSON_LENGTH(json_data);

    WHILE i < num_items DO
        SET user_id = JSON_UNQUOTE(json_extract(json_data, CONCAT('$[', i, '].id')));
        SET user_name = JSON_UNQUOTE(json_extract(json_data, CONCAT('$[', i, '].name')));
        SET user_url = JSON_UNQUOTE(json_extract(json_data, CONCAT('$[', i, '].url')));

        SELECT COUNT(*) INTO name_already_present FROM images WHERE name = user_name;

        IF name_already_present THEN
            SET return_invalid_user = CONCAT(return_invalid_user, user_name, ' , ');
           
        ELSE
        set newid = (select max(id) from images) + 1 ;
        
			SET return_valid_user = JSON_ARRAY_APPEND(return_valid_user, '$', JSON_OBJECT(
                'id', newid,
                'name', user_name,
                'url', user_url
            ));
        
            INSERT INTO images (id, name, url)
            VALUES (newid, user_name, user_url);
           
        END IF;

        SET i = i + 1;
    END WHILE;





	
    if (select length(return_invalid_user))  >  0 && (SELECT JSON_LENGTH(return_valid_user)) > 0  then
		SELECT 'balance' AS msg;
        SELECT json_array(return_valid_user) as valid;
        SELECT return_invalid_user as invalid;
        
        
        
        
        
        
	elseif  (SELECT JSON_LENGTH(return_valid_user)) > 0 then
		SELECT 'Customers added successfully' AS msg;
        SELECT json_array(return_valid_user) as valid;
        
        
        
        
    else
		SELECT 'Customers Name Already Present' AS msg;
        SELECT return_invalid_user as invalid;   
    end if ;
    
END`;


const str6 = `
import './App.css';
import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar';
import TextBox from './Components/TextBox';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Action from './Components/Action';
import CardBox from './Components/CardBox';


function App() {

  const [mode, setDataToMode] = useState();


  const handleModeData = (data) => {
    setDataToMode(data);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const [fetchedData, setFetchedData] = useState([]);
  const fetchData = async () => {
    const url = 'https://dog-breeds2.p.rapidapi.com/dog_breeds';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f67158a9demsh41f97c92e2af6cep1f4289jsnd3e956ef78a0',
        'X-RapidAPI-Host': 'dog-breeds2.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setFetchedData(result);


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>



      <BrowserRouter>
        <Navbar sendDataToParent={handleModeData} title="Fussion" />

        <Routes>
          <Route exact path="/" element={<TextBox modelevel={mode} />} />
          <Route exact path="/code" element={<Action modelevel={mode} />} />
          <Route exact path="/dogs" element={<CardBox modelevel={mode} dataget={fetchedData} />} />
        </Routes>

      </BrowserRouter >
    </>

  );
}

export default App;`;

const str7 = `import React, { useState, useEffect } from 'react';
import Card from './Card';
import './CardBox.css';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';

export default function CardBox(props) {
    const [dark, setDark] = useState({
        color: props.modelevel === 'Light' ? 'white' : 'black',
        backgroundColor: props.modelevel === 'Light' ? '#091030' : 'white'
    });

    useEffect(() => {
        setDark({
            color: props.modelevel === 'Light' ? 'white' : 'black',
            backgroundColor: props.modelevel === 'Light' ? '#091030' : 'white'
        });
    }, [props.modelevel]);

    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newItems = props.dataget.slice(startIndex, endIndex);
        setItems(prevItems => [...prevItems, ...newItems]);
    }, [currentPage, props.dataget]);

    const fetchMoreData = () => {
        setTimeout(() => {
            setCurrentPage(currentPage + 1);
        }, 1500);

    };

    return (
        <>
            <div className="outer" style={dark}>
                <h1>Dog Breeds</h1>
                <div className="inner">
                    <InfiniteScroll
                        dataLength={items.length}
                        next={fetchMoreData}
                        hasMore={items.length < props.dataget.length}
                        loader={<div className='spinner-cont'><Spinner modelevel={props.modelevel} /></div>}
                        style={{ overflowX: 'hidden' }}

                    >
                        <div className="row">
                            {items.map((element, index) => (
                                <div className="col-md-4 col-sm-6" key={index}>
                                    <Card
                                        modelevel={props.modelevel}
                                        eleimg={element.img === "Not available" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png" : element.img}
                                        elebreed={element.breed}
                                        eleori={element.origin}
                                    />
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
}
`;

const str8 = `import axios from "axios";
import Settings from "../config/Setting";
import Auth from "../Auth/index";
import { refreshAccessToken } from "../../Components/Apis/Admin";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";


let headers = {};
const axiosInstance = axios.create({
    baseURL: Settings.API_URL,
    headers
});
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await Auth.getToken();



        if (token) {

            config.headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: \`bearer \${ token }\`
            };
        }
        return config;
    },
    (error) => {

        return Promise.reject(error);
    }
);



axiosInstance.interceptors.response.use(
    (response) => response,
    async function (error) {
        const originalRequest = error.config;


        if (error.response.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;


            const access_token = await refreshAccessToken();

            if (access_token !== null) {

                const refresh_token = await Auth.getRefreshToken();
                const details = {
                    access_token: access_token,
                    refresh_token: refresh_token

                }

                const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(details), process.env.REACT_APP_KEY_SANKET).toString();

                Cookies.set("tk", encryptedData);


                return axiosInstance(originalRequest);
            }


        }
        return Promise.reject(error);
    }
);

export default axiosInstance;



`
const str9 = `
-------------------------
Redux/action-creators/index.js:
-------------------------

export const set_mobile_name = "set_mobile_name";
export const set_mobile_version = "set_mobile_version";
export const set_everything = "set_everything";

export const setmobilename = (data) => {
    return (dispatch) => {
        dispatch({
            type: set_mobile_name,
            payload: data,
        });
    };
};

export const setmobileversion = (data) => {
    return (dispatch) => {
        dispatch({
            type: set_mobile_version,
            payload: data,
        });
    };
};

export const seteverything = (data) => {
    return (dispatch) => {
        dispatch({
            type: set_everything,
            payload: data,
        });
    };
};
---------------------------
Redux/Reducers/SanketReducers.js:
---------------------------

import {
    set_mobile_name,
    set_mobile_version,
    set_everything
} from '../action-creators/index';


const initialState = {
    mobileName: "",
    mobileVersion: 0,
    wholedata: {
        name: "",
        version: 0
    }
};

const callSanketReducers = (state = initialState, action) => {
    switch (action.type) {
        case set_mobile_name:
            return {
                ...state,
                mobileName: action.payload,

            };
        case set_mobile_version:
            return {
                ...state,
                mobileVersion: action.payload,

            };
        case set_everything:
            return {
                ...state,
                wholedata: action.payload,

            };
        default:
            return state;
    }
}

export default callSanketReducers;
------------------
Redux/Reducers/index.js:
------------------

import { combineReducers } from "redux";
import callSanketReducers from "./sanketReducer";
import callPracticeReducer from "./PracticeReducer";

const reducers = combineReducers({
    callSanketReducers: callSanketReducers,
    callPracticeReducer: callPracticeReducer

});

export default reducers;

--------------
Redux/index.js:
--------------
export * as actionCreators from './action-creators/index';

----------
Redux/Store.js :
----------
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers/index";

const middleware = [thunk, logger];
export const store = configureStore({
    reducer: reducers,
    middleware,
});

---------
index.js:
---------
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './Redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

-------------
Component.js:
-------------

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Redux/index';


export default function Theme() {
    const dispatch = useDispatch();
    const myMobile = useSelector((state) => state.callSanketReducers);
    const name = useSelector((state) => state.callPracticeReducer);
    const { setmobilename, seteverything, setmobileversion, setname, setlastname } = bindActionCreators(actionCreators, dispatch)
    useEffect(() => {
        console.log(myMobile);
    }, [myMobile])

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setmobilename(value);

        } else {
            setmobileversion(value);
            //dispatch(actionCreators.setmobileversion(value))
        }
        seteverything({
            ...myMobile.wholedata,
            [name]: value
        })

    }

    return (
        <>
            <div>

                <input type="text" placeholder='Enter Mobile Name' name="name" onChange={onChangeHandler} />
                <h1>{myMobile.mobileName}</h1>
            </div>
            <div>

                <input type="number" placeholder='Enter Mobile Version' name="version" onChange={onChangeHandler} />
                <h1>{myMobile.mobileVersion}</h1>

            </div>

            <h1>{myMobile.wholedata.name}</h1>
            <h1>{myMobile.wholedata.version}</h1>
            <h1>{name.name}</h1>
            <h1>{name.lastName}</h1>
            <button onClick={() => { setname("rook"); setlastname("knight") }}>Submit</button>
        </>
    )
}

`

export { str1, str8, str9 };
export { str2 };
export { str3 };
export { str4 };
export { str5 };
export { str6 };
export { str7 };
