import {
    Select,
    InputLabel,
    MenuItem,
    FormHelperText,
    FormControl,
    InputAdornment,
  } from "@mui/material";
  import styles from "./GroupComponent.module.css";
  
  const GroupComponent = () => {
    return (
      <header className={styles.searchFieldBackgroundParent}>
        <div className={styles.searchFieldBackground} />
        <div className={styles.searchBar}>
          <div className={styles.searchInputArea}>
            <div className={styles.sampleLogo}>
              <img
                className={styles.sampleLogoChild}
                loading="lazy"
                alt=""
                src="/group-296.svg"
              />
              <div className={styles.edCircle}>Ed-Circle.</div>
            </div>
            <div className={styles.inputField}>
              <div className={styles.inputFieldBase}>
                <div className={styles.inputWithLabel}>
                  <div className={styles.label}>Email</div>
                  <div className={styles.input}>
                    <div className={styles.content}>
                      <img
                        className={styles.searchIcon}
                        alt=""
                        src="/search.svg"
                      />
                      <div className={styles.text}>Want to learn?</div>
                      <FormControl
                        className={styles.button}
                        variant="standard"
                        sx={{
                          borderTopWidth: "1px",
                          borderRightWidth: "1px",
                          borderBottomWidth: "1px",
                          borderLeftWidth: "1px",
                          backgroundColor: "#f9f5ff",
                          borderRadius: "8px",
                          width: "32.743362831858406%",
                          height: "36px",
                          m: 0,
                          p: 0,
                          "& .MuiInputBase-root": {
                            m: 0,
                            p: 0,
                            minHeight: "36px",
                            justifyContent: "center",
                            display: "inline-flex",
                          },
                          "& .MuiInputLabel-root": {
                            m: 0,
                            p: 0,
                            minHeight: "36px",
                            display: "inline-flex",
                          },
                          "& .MuiMenuItem-root": {
                            m: 0,
                            p: 0,
                            height: "36px",
                            display: "inline-flex",
                          },
                          "& .MuiSelect-select": {
                            m: 0,
                            p: 0,
                            height: "36px",
                            alignItems: "center",
                            display: "inline-flex",
                          },
                          "& .MuiInput-input": { m: 0, p: 0 },
                          "& .MuiInputBase-input": {
                            color: "#7e56d9",
                            fontSize: 14,
                            fontWeight: "Semi Bold",
                            fontFamily: "Inter",
                            textAlign: "left",
                            p: "0 !important",
                            marginLeft: "16px",
                          },
                        }}
                      >
                        <InputLabel color="secondary" />
                        <Select
                          color="secondary"
                          disableUnderline
                          displayEmpty
                          IconComponent={() => (
                            <img
                              width="20px"
                              height="20px"
                              src="/chevrondown.svg"
                              style={{ marginRight: "16px" }}
                            />
                          )}
                        >
                          <MenuItem>Explore</MenuItem>
                        </Select>
                        <FormHelperText />
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav className={styles.programParent}>
            <div className={styles.program}>Program</div>
            <div className={styles.enterprise}>Enterprise</div>
            <div className={styles.universities}>Universities</div>
          </nav>
        </div>
        <div className={styles.signIn}>Sign in</div>
        <div className={styles.button1}>
          <div className={styles.buttonBase}>
            <div className={styles.text1}>Create free account</div>
          </div>
        </div>
      </header>
    );
  };
  export default GroupComponent;