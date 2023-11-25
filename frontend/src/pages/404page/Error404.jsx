import React from 'react';
import styles from './Error404.module.css';

const Error404 = () => {
  return (
    <div>
      <div className={styles.master}>
        <section className={styles.page_404}>
            <div className={styles.container}>
                <div className={styles.row} >
                    <div>
                        <div>
                            <div className={styles.four_zero_four_bg}>
                                <h1>404</h1>
                            </div>

                            <div className={styles.contant_box_404}>
                                <h3 className={styles.h2}>
                                    Look like you're lost
                                </h3>

                                <p>the page you are looking for not avaible!</p>

                                <a href="/login" className={styles.link_404}>Go to Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </div>
  )
}

export default Error404
