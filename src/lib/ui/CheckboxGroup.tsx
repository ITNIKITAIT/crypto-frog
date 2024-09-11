import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styled from "@emotion/styled";

const CustomCheckbox = styled(({ ...other }) => <Checkbox {...other} />)`
  & svg path {
    fill: ${props => props.gradient};
  }
`;

const CheckboxGroup = (): JSX.Element => (
  <FormGroup>
    <FormControlLabel
      control={
        <CustomCheckbox>
          <svg>
            <defs>
              <linearGradient
                id="gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#313ffe"
                />
                <stop
                  offset="100%"
                  stopColor="#ac1ef2"
                />
              </linearGradient>
            </defs>
            <path d="M0 0h24v24H0z" />
          </svg>
        </CustomCheckbox>
      }
      label="Label"
    />
    <FormControlLabel
      control={<Checkbox />}
      label="Label"
    />
  </FormGroup>
);

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
