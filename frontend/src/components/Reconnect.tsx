import errorLogo from '../assets/icons/plug-error-illustration.svg';

const Reconnect = () => {
  return (
    <div className="m-auto flex max-w-56 flex-col items-center gap-3 pl-4 body">
      <img src={errorLogo} alt="" />
      <button
        className="w-max rounded-md bg-blue-950 px-3 py-1"
        onClick={() => window.location.reload()}
      >
        Try reload page
      </button>
    </div>
  );
};

export default Reconnect;
