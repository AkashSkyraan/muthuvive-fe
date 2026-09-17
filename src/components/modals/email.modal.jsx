import { Modal, Input, Button, Typography, Space } from "antd";
import React, { useState } from "react";

const { Text, Title } = Typography;

function EmailOtpModal({ open, email, onClose, onVerified }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) return;

    try {
      setLoading(true);

      console.log("OTP:", otp);

      // Verify OTP API call here

      onVerified();
    } catch (error) {
      console.error("OTP Verification Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    console.log("Resend OTP:", email);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={420}
      destroyOnClose
    >
      <div className="px-2 py-3 text-center">
        <Title level={3} className="!mb-2">
          Verify Email
        </Title>

        <Text type="secondary">Enter the 6-digit OTP sent to</Text>

        <div className="mt-1">
          <Text strong>{email}</Text>
        </div>

        <Input
          value={otp}
          maxLength={6}
          inputMode="numeric"
          placeholder="Enter OTP"
          size="large"
          className="!mt-6 text-center tracking-[6px]"
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setOtp(value);
          }}
        />

        <Button
          type="primary"
          size="large"
          block
          loading={loading}
          disabled={otp.length !== 6}
          onClick={handleVerify}
          className="!mt-5"
        >
          Verify OTP
        </Button>

        <Space className="!mt-4">
          <Text type="secondary">Didn't receive the OTP?</Text>

          <Button type="link" onClick={handleResend} className="!p-0">
            Resend OTP
          </Button>
        </Space>
      </div>
    </Modal>
  );
}

export default EmailOtpModal;
