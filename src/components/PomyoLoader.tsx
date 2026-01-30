import '../styles/loader.css';
import FlexContainer from './flexContainer';

export function PomyoLoader() {
  return (
    <div className="loaderWrapper">
      <FlexContainer direction='column' align='center' gap='md'>
        <div className='app-logo'>
          <img src="./pomyoLogo.svg" alt="pomyo logo" />
        </div>
        <div>
          <svg
            width="262"
            height="262"
            viewBox="0 0 262 262"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M69.4225 93.3828C69.4125 85.3928 73.4025 80.7428 78.7325 75.4028C88.8441 65.2722 112.043 66.0628 120.228 65.2178C136.905 63.4961 163.723 65.0428 168.408 68.0378C172.314 70.5348 179.043 75.6828 184.408 82.1928C189.552 88.4356 192.743 99.6628 195.913 108.188C198.43 114.959 195.443 127.963 193.928 138.183C191.935 151.627 184.103 162.343 179.778 171.013C174.228 182.137 168.443 184.363 161.783 187.538C154.837 190.849 140.523 195.363 129.783 196.548C120.492 197.573 103.823 196.063 94.9475 191.898C88.137 188.702 76.8025 178.783 70.2725 170.738C66.5777 166.186 66.1025 158.403 65.2575 153.403C62.9338 139.653 66.4025 116.743 69.5775 110.573C72.7525 105.393 74.4125 102.393 76.7375 100.398C78.0725 99.3928 79.7225 98.4028 81.4225 97.3828"
              stroke="#FF6347"
              strokeWidth="129"
              strokeLinecap="round"
            />
            <path
              className={"rotateNeedle-base"}
              d="M118.423 74.3828V130.383"
              stroke="white"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              className={"rotateNeedle"}
              d="M118.423 132.383C119.083 132.053 119.743 131.723 131.633 131.553C143.523 131.383 166.623 131.383 179.018 131.548C192.403 132.043 199.033 132.383 208.028 132.053C211.413 131.723 212.403 131.063 213.423 130.383"
              stroke="white"
              strokeWidth="20"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <p className='loader-text'>Getting things ready...</p>
          <p className='loader-subtext'>Good focus takes a second</p></div>
      </FlexContainer>
    </div>
  );
}
