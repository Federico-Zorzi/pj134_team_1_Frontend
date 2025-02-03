export default function Footer() {
  return (
    <footer className="text-bg-dark">
      <div className="container p-4 ">
        <div className="d-flex align-items-center">
          <h5 className="mt-3">© Boolbnb</h5>
          <div className="ms-auto mt-2">
            <a href="https://www.facebook.com/login" className="text-white ">
              <i className="fa-brands fa-facebook fa-lg"></i>
            </a>
            <a
              href="https://www.instagram.com/accounts/login/"
              className="text-white ms-3"
            >
              <i class="fa-brands fa-instagram fa-lg"></i>
            </a>
            <a
              href="https://twitter.com/i/flow/login"
              className="text-white ms-3 "
            >
              <i class="fa-brands fa-x-twitter fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
