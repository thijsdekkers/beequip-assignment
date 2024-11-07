import styles from '../../Styles.module.css';

import React from 'react';
const Button = ({ children }: { children: React.ReactNode }) => <button className={styles.button} type="submit">{children}</button>;
export default Button;