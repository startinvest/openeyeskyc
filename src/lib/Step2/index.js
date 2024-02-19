import React, { useEffect, useState } from "react"
import { Row, Col, Form } from "react-bootstrap"
import Select from "react-select"
import { FlagImage, PhoneInput, defaultCountries, parseCountry } from "react-international-phone"
import { PhoneNumberUtil } from "google-libphonenumber"
import "react-international-phone/style.css"
import styled from "styled-components"
import "./index.css"

const StyledFormControl = styled(Form.Control)`
  padding: 8px;
  font-size: 16px;
  &::placeholder {
    color: #aaa; /* Placeholder color */
  }
`

const Step2 = () => {
  const priorityCountries = ["us", "ca", "gb", "ae", "cn", "in"] // Add ISO codes here to prioritize
  const [phone, setPhone] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(defaultCountries[0].iso2)
  const [selectedCountryName, setSelectedCountryName] = useState(defaultCountries[0].name)

  const [phoneMask, setPhoneMask] = useState("(...) ...-....")
  const [countryCode, setCountryCode] = useState("1")

  const phoneUtil = PhoneNumberUtil.getInstance()
  const isPhoneValid = (phone) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone, selectedCountry))
    } catch (error) {
      return false
    }
  }
  const isValid = isPhoneValid(phone)

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value)
    setSelectedCountryName(selectedOption.label)
    setPhone("")
  }

  const sortedCountries = [...defaultCountries].sort((a, b) => {
    // Get priority index, default to a large number if not found
    let priorityA = priorityCountries.indexOf(parseCountry(a).iso2)
    let priorityB = priorityCountries.indexOf(parseCountry(b).iso2)
    priorityA = priorityA === -1 ? Number.MAX_SAFE_INTEGER : priorityA
    priorityB = priorityB === -1 ? Number.MAX_SAFE_INTEGER : priorityB

    // Prioritize by index, or maintain original order if neither is prioritized
    return priorityA - priorityB
  })

  // Mapping sortedCountries to options
  console.log(sortedCountries)
  const countryOptions = sortedCountries.map((country) => ({
    value: parseCountry(country).iso2,
    label: parseCountry(country).name
  }))

  // Effect to update phone mask when selectedCountry changes
  useEffect(() => {
    const countryIndex = sortedCountries.findIndex((country) => country[1] === selectedCountry)
    if (countryIndex !== -1) {
      const mask = sortedCountries?.[countryIndex]?.[3]
      const code = sortedCountries?.[countryIndex]?.[2]
      setPhoneMask(mask)
      setCountryCode(code)
    }
  }, [selectedCountry])

  return (
    <Form>
      <h6>Where do you live?</h6>
      <Form.Group controlId='formCountry' style={{ paddingBottom: "16px" }}>
        <Select
          defaultValue={countryOptions[0]}
          options={countryOptions}
          value={countryOptions.find((option) => option.value === selectedCountry)}
          onChange={handleCountryChange}
          placeholder='Select a country'
          isSearchable={true}
          formatOptionLabel={({ label, value }) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", marginRight: "16px" }}>
                <FlagImage iso2={value} size='30px' />
              </div>

              {label}
            </div>
          )}
          styles={{
            control: (base) => ({
              ...base,
              fontSize: "14px"
            }),
            menu: (base) => ({
              ...base,
              fontSize: "14px"
            }),
            option: (base, state) => ({
              ...base,
              fontSize: "14px",
              color: "black"
            }),
            placeholder: (base) => ({
              ...base,
              fontSize: "14px"
            })
            // You can continue to customize other parts as needed
          }}
        />
      </Form.Group>
      <h6>Mobile number</h6>
      <h6 style={{ fontWeight: 400, color: "#a9a9a9", fontSize: 14 }}>Message and data rates may apply</h6>

      <Form.Group style={{ paddingBottom: 16 }}>
        <PhoneInput
          defaultCountry={selectedCountry}
          value={phone}
          onChange={setPhone}
          preferredCountries={priorityCountries}
          key={selectedCountry}
          forceDialCode={true}
          disableDialCodeAndPrefix={true}
          showDisabledDialCodeAndPrefix={true}
          defaultMask={phoneMask || ""}
          placeholder={phoneMask ? phoneMask?.replace(/\./g, "0") : ""}
          inputStyle={{ color: "red" }}
          inputClassName='custom-phone-input'
        />
        {!isValid && phone.length > 6 && phone !== "" && <div style={{ color: "red" }}>Phone is not valid</div>}
      </Form.Group>

      <h6>Legal name</h6>
      <Row className='mb-3' style={{ paddingBottom: "8px" }}>
        <Col>
          <StyledFormControl
            type='text'
            placeholder='First name'
            name='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Col>
        <Col>
          <StyledFormControl
            type='text'
            placeholder='Last name'
            name='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Col>
      </Row>
    </Form>
  )
}

export default Step2
