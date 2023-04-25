import Notes from "./Notes";
function Home (props) {
  const {showAlert}= props
  return (
    <div>

      <Notes showAlert={showAlert}/>      {/*notes component ko yahan home me use kiya ja rha hai, notes me alert prop bhi drill kr diya*/}
    </div>
  );
}

export default Home;