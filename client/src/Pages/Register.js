const Register = () => {
  return (
    <div className="form">
      <h1>Register to create account</h1>
      <div className="form">
        <form>
          <div className="input-container">
            <label>Email</label>
            <input type="text" name="email" required></input>
            <label>Username </label>
            <input type="text" name="username" required />
            {/* {renderErrorMessage("uname")} */}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="password" required />
            <label> Repeat Password </label>
            <input type="password" name="password" required />
            {/* {renderErrorMessage("pass")} */}
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
export default Register
