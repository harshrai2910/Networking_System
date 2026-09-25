import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  getConnectionDataFromServer,
  patchIsAcceptedFromServer,
  patchIsRejectedFromServer,
  patchRemovedUserFromServer,
} from "../../../services/networkLinkServices";
import { ReceivedRequest } from "./ReceivedRequest";
import { SentRequest } from "./SentRequest";
import { TotalConnection } from "./TotalConnections";

export const MyNetwork = () => {
  const [sentRequest, setSentRequest] = useState([]);
  const [receivedRequest, setReceivedRequest] = useState([]);
  const [totalConnection, setTotalConnection] = useState([]);
  const [isloader, setIsloader] = useState(false);

  const fetchConnectionData = async () => {
    const connectionData = await getConnectionDataFromServer();

    setSentRequest(connectionData.sentRequest);
    setReceivedRequest(connectionData.receivedRequest);
    setTotalConnection(connectionData.totalConnection);
  };

  useEffect(() => {
    fetchConnectionData();
  }, []);

  const handleAccept = async (id) => {
    setIsloader(true);
    patchIsAcceptedFromServer(id).then((data) => {
      if (data) {
        fetchConnectionData();
        setIsloader(false);
      }
    });
  };

  const handleReject = async (id) => {
    await patchIsRejectedFromServer(id);
    fetchConnectionData();
  };

  const handleRemoveConnection = async (id) => {
    await patchRemovedUserFromServer(id);
    fetchConnectionData();
  };

  return (
    <>
      <div className="flex items-center justify-center mt-15">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-6xl grid grid-cols-1 md:grid-cols-8 md:gap-3 items-start"
        >
          <div className="md:col-span-3 border border-slate-200 md:rounded-2xl p-6 shadow-sm bg-white mb-3 ">
            <TotalConnection
              totalConnection={totalConnection}
              handleRemoveConnection={handleRemoveConnection}
            />
          </div>

          <div className="md:col-span-3 border border-slate-200 md:rounded-2xl px-4 py-5 shadow-sm bg-white mb-3 ">
            <ReceivedRequest
              receivedRequest={receivedRequest}
              handleAccept={handleAccept}
              handleReject={handleReject}
              isloader={isloader}
              setIsloader={setIsloader}
            />
          </div>

          <div className="md:col-span-2 border border-slate-200 md:rounded-2xl px-4 py-5 shadow-sm bg-white mb-3 ">
            <SentRequest sentRequest={sentRequest} />
          </div>
        </motion.div>
      </div>
    </>
  );
};
