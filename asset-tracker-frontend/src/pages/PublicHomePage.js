import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePageAnon = () => {
  return (
    <>
      {/* <div className="container"  > */}
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <svg
              className="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#325ea8" />
            </svg>

            <div className="container">
              <div className="carousel-caption text-start">
                {/* <h1>Example headline.</h1> */}
                <p style={{ color: "white" }}>Experience total traceability</p>
                <p>
                  <Link className="btn btn-sm btn-primary" to="/signup">
                    Sign up today
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <svg
              className="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#325ea8" />
            </svg>

            <div className="container">
              <div className="carousel-caption " style={{ color: "white" }}>
                <p style={{ color: "white" }}>
                  Stay in the know with real-time reports
                </p>
                <p>
                  <a
                    className="btn btn-sm btn-primary"
                    href="https://github.com/murata2021/assetTracker"
                    target="_blank"
                  >
                    Learn more
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <svg
              className="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#325ea8" />
            </svg>

            <div className="container-fluid">
              <div className="carousel-caption text-end ">
                <p style={{ color: "white" }}>
                  Maximize your asset utilization
                </p>
                <p>
                  <Link className="btn btn-sm btn-primary" to="/login">
                    Already User? Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container marketing mt-4">
        {/* <div className="d-flex flex-row justify-content-around">
            <div className="p-2"> */}
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4">
            <div className="card border-0 h-100">
              <img
                style={{ width: "140px", height: "140px" }}
                className="rounded-circle card-img-top mt-3 mx-auto img-thumbnail"
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGF0YXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500"
              />
              <div className="card-body">
                <h5 className="card-title">Data</h5>
                <p className="card-text">
                  Get instant access to asset/inventory data
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-4">
            <div className="card border-0 h-100">
              <img
                style={{ width: "140px", height: "140px" }}
                className="rounded-circle card-img-top mt-3 mx-auto img-thumbnail"
                src="https://media.istockphoto.com/photos/covid19-abstract-infographic-at-digital-display-picture-id1358764378?b=1&k=20&m=1358764378&s=170667a&w=0&h=pac1cAIWL5sv9ungu10ntyuoRpkh0IsmBw2LnPn6EOc="
              />
              <div className="card-body">
                <h5 className="card-title">Dashboard</h5>
                <p className="card-text">
                  Monitor asset status & Instantly get notified about issues
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-4">
            <div className="card border-0 h-100">
              <img
                style={{ width: "140px", height: "140px" }}
                className="rounded-circle card-img-top mt-3 mx-auto img-thumbnail"
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGRlY2lzaW9uJTIwdGVjaG5vbG9neXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500"
              />
              <div className="card-body">
                <h5 className="card-title">Decision</h5>
                <p className="card-text">
                  End-to-end visibility & Data-driven decisions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="featurette-divider" />

      <footer id="site-footer" className="container mt-auto py-3" style={{height:"20px",padding:"0 15px"}}>
        <p className="float-end">
          <a href="https://github.com/murata2021" target="_blank">
            <FaGithub />
          </a>
          <span
            className="divider"
            style={{ width: "5px", display: "inline-block" }}
          ></span>
          <a
            href="https://www.linkedin.com/in/murat-yucel-arslan-5285b912b/"
            target="_blank"
          >
            <FaLinkedin />
          </a>
          <span
            className="divider"
            style={{ width: "5px", height: "auto", display: "inline-block" }}
          ></span>
          <a href="#"> Back to top</a>
        </p>
        <p style={{ fontSize: "14px" }}>
          &copy; 2017–2022 Asset Tracker Company, Inc. &middot;
          <a href="#"> Privacy </a>
          &middot; <a href="#"> Terms</a>
        </p>
      </footer>
    </>
  );
};

export default HomePageAnon;
