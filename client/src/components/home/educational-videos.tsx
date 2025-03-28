import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EducationalVideos = () => {
  // Import Bootstrap CSS only on client-side to avoid SSR issues
  useEffect(() => {
    import('bootstrap/dist/css/bootstrap.min.css');
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-neutral-900 mt-8">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-12 text-neutral-800 dark:text-white">
          Educational Video Library
        </h2>
        
        <div className="container">
          <div className="row justify-content-center align-items-center">
            {/* First Video Card */}
            <div className="col-md-5">
              <div className="card mb-4 shadow-sm">
                <video
                  src="https://codingyaar.com/wp-content/uploads/video-in-bootstrap-card.mp4"
                  className="card-img-top"
                  controls
                ></video>
                <div className="card-body">
                  <h5 className="card-title">LEARN ALGEBRAIC EXPRESSIONS</h5>
                  <p className="card-text">
                    Understanding algebraic expressions is essential for solving mathematical problems efficiently. An algebraic expression is a combination of numbers, variables, and mathematical operations such as addition, subtraction, multiplication, and division. Learning how to simplify, evaluate, and manipulate these expressions helps in solving equations and real-world problems.
                    <br /><br />
                    Take your learning further by practicing what you've learned! Click the link below to test your skills:
                  </p>
                  <a href="#" className="btn btn-primary">
                    Practice Now
                  </a>
                </div>
              </div>
            </div>

            {/* Second Video Card (Opposite) */}
            <div className="col-md-5">
              <div className="card mb-4 shadow-sm">
                <video
                  src="https://codingyaar.com/wp-content/uploads/video-in-bootstrap-card.mp4"
                  className="card-img-top"
                  muted
                  autoPlay
                  loop
                ></video>
                <div className="card-body">
                  <h5 className="card-title">CIRCLE THEOREM</h5>
                  <p className="card-text">
                    The Circle Theorem consists of several important rules that describe the relationships between angles, chords, and tangents in a circle. Understanding these theorems helps in solving geometry problems involving circles, including finding missing angles and proving properties. Key theorems include the angle in a semicircle being 90°, the alternate segment theorem, and angles in the same segment being equal.
                    <br /><br />
                    Now, put your knowledge to the test! Click the link below to practice:
                  </p>
                  <a href="#" className="btn btn-primary">
                    Practice Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row of Video Cards */}
          <div className="row justify-content-center mt-4">
            <div className="col-md-5">
              <div className="card mb-4 shadow-sm">
                <video
                  src="https://codingyaar.com/wp-content/uploads/video-in-bootstrap-card.mp4"
                  className="card-img-top"
                  controls
                ></video>
                <div className="card-body">
                  <h5 className="card-title">BINOMIAL THEOREM</h5>
                  <p className="card-text">
                    The Binomial Theorem provides a quick way to expand expressions of the form (a + b)ⁿ without multiplying repeatedly. It states that any power of a binomial can be expanded using coefficients from Pascal's Triangle or the formula involving factorials. This theorem is widely used in algebra, probability, and calculus.
                    <br /><br />
                    Now, apply what you've learned! Click the link below to practice:
                  </p>
                  <a href="#" className="btn btn-primary">
                    Practice Now
                  </a>
                </div>
              </div>
            </div>

            {/* Statistics Card - No overlay on mobile */}
            <div className="col-md-5">
              <div className="card mb-4 shadow-sm">
                <video
                  src="https://codingyaar.com/wp-content/uploads/video-in-bootstrap-card.mp4"
                  className="card-img-top"
                  controls
                ></video>
                <div className="card-body">
                  <h5 className="card-title">PROBABILITY & STATISTICS</h5>
                  <p className="card-text">
                    Probability and Statistics are foundational for understanding data, making predictions, and drawing conclusions. These subjects cover concepts like probability distributions, hypothesis testing, and data visualization techniques.
                    <br /><br />
                    Ready to practice these concepts? Click below:
                  </p>
                  <a href="#" className="btn btn-primary">
                    Practice Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalVideos;