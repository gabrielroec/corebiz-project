import styles from "./SectionTitle.module.scss";

interface SectionTitleProps {
  title: string;
}
const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div>
      <p className={styles.sectionTitle}>{title}</p>
      <div className={styles.line} />
    </div>
  );
};

export default SectionTitle;
