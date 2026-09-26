export const Connections = ({ userData }) => {
  console.log(userData);
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-medium">Connections</h1>
          <p className="text-xs">Grow your network</p>
        </div>
        <p className="text-blue-500 text-sm font-bold">
          {userData?.connections ? userData.Connections : 0}
        </p>
      </div>
    </>
  );
};
