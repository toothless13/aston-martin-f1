const NavBar = () => {
  return (
    <div className=" h-20 border-b-2 border-amlime">
      <img src="/assets/logo.png" className="w-[200px] mx-auto cursor-pointer" onClick={() => location.reload()}></img>
    </div>
  )
}

export default NavBar