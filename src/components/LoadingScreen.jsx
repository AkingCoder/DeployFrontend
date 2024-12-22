
const LoadingScreen = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500   text-gray-700 animate-fade-in">
        <style>
            {`
          .loading-spinner {
            border: 1px solid #f9f5f0;
            border-top: 8px solid rgb(0, 0, 0);
            border-radius:50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
  
          .animate-fade-in {
            animation: fade-in 0.5s ease-in-out;
          }
          
          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
        </style>
        <div className="loading-spinner mb-4"></div>
    </div>
);
export default LoadingScreen;