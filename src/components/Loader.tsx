export default function Loader (): JSX.Element {
  return (
        <div className='loader-outer'>
            <div className='loader-inner'>
                <div className="lds-ring">
                    <div></div><div></div><div></div><div></div>
                </div>
            </div>
        </div>
  )
}