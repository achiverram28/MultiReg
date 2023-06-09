import React from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
const Progress = () => {
  const { pathname } = useLocation();
  const isFirstStep = pathname === "/";
  const isSecondStep = pathname === "/second";
  const isThirdStep = pathname === "/third";
  return (
    <React.Fragment>
      <div className="steps">
        <div className={`${isFirstStep ? "step active" : "step"}`}>
          <div>1</div>
          <div>
            {isSecondStep || isThirdStep ? (
              <Link to="/">Step 1</Link>
            ) : (
              "Step 1"
            )}
          </div>
        </div>
        <div className={`${isSecondStep ? "step active" : "step"}`}>
          <div>2</div>
          <div>{isThirdStep ? <Link to="/second">Step 2</Link> : "Step 2"}</div>
        </div>
        <div className={`${pathname === "/third" ? "step active" : "step"}`}>
          <div>3</div>
          <div>Step 3</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default withRouter(Progress);
