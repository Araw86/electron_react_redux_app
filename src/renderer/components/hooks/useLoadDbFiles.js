import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchStateProp } from "../../redux/configurationSlice";
import { ipcAddStore, ipcGetStore, ipcSqlQuery } from "../../utilities/ipcFunctions";


export const useLoadDbFiles = () => {
  const dispatch = useDispatch();
  const bLoadDbFiles = useSelector((state) => state.configurationReducer.bLoadDbFiles)


  const loadDbFiles = async () => {



  }

  useEffect(() => {
    if (bLoadDbFiles === true) {

    }
  }, [bLoadDbFiles])

}

