import {
  Dimensions,
  StyleSheet,
  View,
  Pressable,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  EmptyWallet,
  Notification,
  ReceiveSquare2,
  TransmitSqaure2,
  StatusUp,
  FavoriteChart,
  ReceiptText,
  Reserve,
  Flash,
  Eye,
  EyeSlash,
  Copy,
  Refresh2,
  Bank,
} from "iconsax-react-native";
import { Formik } from "formik";
import { useFocusEffect } from "@react-navigation/native";

import { Colors } from "@/src/constants/Colors";
import MediumBox from "@/src/components/MediumBox";
import StyledText from "@/src/components/StyledText";
import LayeredScreen from "@/src/components/LayeredScreen";
import AppRipple from "@/src/components/AppRipple";
import AppModal from "@/src/components/AppModal";
import AppTextField from "@/src/components/AppTextField";

import { retrieveUserData } from "@/src/storage/userData";
import {
  getVirtualAccounts,
  getWalletBalance,
  walletWithdrawalRequest,
} from "@/src/api";

import { showMessage } from "react-native-flash-message";
import { Link } from "expo-router";
import { copyToClipboard } from "../../helperFunctions/copyToClipboard";
import { amountFormatter } from "../../helperFunctions/amountFormatter";
import CenterModal from "@/src/components/AppCenterModal";

import { useChat } from "@/src/context/ChatContext";

const index = () => {
  const { toggleModal } = useChat();

  const [loading, setIsLading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const screenWidth = Dimensions.get("screen").width;
  const [userData, setUserData] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [userBalance, setUserBalance] = useState({
    currencyCode: "",
    amount: 0,
  });
  const [userVirtualAccounts, setUserVirtualAccounts] = useState([]);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [virtualAccount, setVirtualAccount] = useState([]);

  const [copiedText, setCopiedText] = useState("");

  const formikRef = useRef();

  const fetchData = async () => {
    setIsLading(true);
    const data = await retrieveUserData();
    setUserData(data);
    setFirstname(data.fullName.split(" ")[0]);

    const userBalance = await getWalletBalance();
    setUserBalance({
      currencyCode: userBalance[0].currencyCode,
      amount: userBalance[0].amount,
    });

    const virtualAccounts = await getVirtualAccounts();
    console.log(virtualAccounts);
    setVirtualAccount(virtualAccounts);
    setIsLading(false);
  };

  const withdrawalRequest = async (amount) => {
    // const requestData = {
    //   currencyCode: "NGN",
    //   amount: 10000,
    //   beneficiaryBankAccountNo: "2181776260",
    //   // transactionPin: 0,
    // };
    // const response = await walletWithdrawalRequest(requestData);
    // console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true; // Prevent default behavior (going back)
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  return (
    <LayeredScreen
      onRefresh={onRefresh}
      refreshing={refreshing}
    >
      <View style={{ paddingHorizontal: 20, flex: 1, flexGrow: 1 }}>
        <View
          style={{
            backgroundColor: Colors.white,
            height: 30,
            width: 30,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 15,
            top: -155,
          }}
        >
          <Notification
            size={25}
            color={Colors.primary}
            variant="Bold"
          />
        </View>

        <View style={{ zIndex: 5, position: "absolute", top: -100, left: 15 }}>
          <StyledText
            color={Colors.white}
            variant="bold"
            type="heading"
          >
            Hello, {firstname}
          </StyledText>
        </View>

        <View
          style={[
            {
              backgroundColor: Colors.white,
              borderRadius: 15,
              elevation: 5,
              position: "absolute",
              top: -55,
              left: 15,
              height: 160,
              padding: 15,
            },
            { width: screenWidth - 30 },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <EmptyWallet
              size={25}
              color={Colors.primary}
              variant="Bold"
            />
            <StyledText
              color={Colors.primary}
              type="title"
              variant="medium"
            >
              Wallet Balance
            </StyledText>
            <Pressable onPress={fetchData}>
              {loading ? (
                <ActivityIndicator
                  size={"small"}
                  color={Colors.light}
                />
              ) : (
                <Refresh2
                  size={15}
                  color={Colors.light}
                  style={{ marginLeft: 10 }}
                />
              )}
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 12,
            }}
          >
            {hideBalance ? (
              <StyledText
                color={Colors.primary}
                type="heading"
                variant="bold"
              >
                ₦ ******
              </StyledText>
            ) : (
              <StyledText
                color={Colors.primary}
                type="heading"
                variant="bold"
              >
                {amountFormatter.format(userBalance.amount)}
              </StyledText>
            )}

            <Pressable onPress={() => setHideBalance(!hideBalance)}>
              {hideBalance ? (
                <Eye
                  size={25}
                  color={Colors.light}
                />
              ) : (
                <EyeSlash
                  size={25}
                  color={Colors.light}
                />
              )}
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-around",
              flex: 1,
            }}
          >
            <AppRipple
              style={{
                borderWidth: 1,
                borderColor: Colors.border,
                borderRadius: 7,
                flexDirection: "row",
                padding: 5,
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                overflow: "hidden",
                width: "47%",
              }}
              onPress={() => {
                setIsDepositModalOpen(true);
              }}
            >
              <ReceiveSquare2
                size={27}
                color={Colors.lightPrimary}
                variant="Bold"
              />
              <StyledText
                color={Colors.text}
                type="body"
                variant="medium"
              >
                Deposit
              </StyledText>
            </AppRipple>

            <AppRipple
              style={{
                borderWidth: 1,
                borderColor: Colors.border,
                borderRadius: 7,
                flexDirection: "row",
                padding: 5,
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                overflow: "hidden",
                width: "47%",
              }}
              onPress={() => setIsWithdrawModalOpen(true)}
            >
              <TransmitSqaure2
                size={27}
                color={Colors.primary}
                variant="Bold"
              />
              <StyledText
                color={Colors.text}
                type="body"
                variant="medium"
              >
                Withdraw
              </StyledText>
            </AppRipple>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            zIndex: -1,
            marginTop: 25,
            // justifyContent: "space-evenly"
          }}
        >
          <View
            style={{
              width: "100%",
              borderWidth: 1,
              borderRadius: 12,
              borderColor: Colors.lightPrimary,
              marginTop: 120,
              marginVertical: 15,
              padding: 15,
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Flash
                size={25}
                color={Colors.lightPrimary}
                variant="Bold"
              />

              <StyledText
                type="title"
                variant="medium"
                color={Colors.lightPrimary}
              >
                Quick Access
              </StyledText>
            </View>

            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <Link
                href={"/products"}
                asChild
              >
                <MediumBox
                  icon={
                    <StatusUp
                      size={27}
                      color={Colors.lightPrimary}
                      variant="Bold"
                    />
                  }
                  title={"Invest Money"}
                  subtitle={"Grow your wealth securely"}
                />
              </Link>
              <Link
                href={"/portfolio"}
                asChild
              >
                <MediumBox
                  icon={
                    <FavoriteChart
                      size={27}
                      color={Colors.lightPrimary}
                      variant="Bold"
                    />
                  }
                  title={"My Portfolio"}
                  subtitle={"Track your investments at a glance"}
                />
              </Link>
              <Link
                href={"/transactions"}
                asChild
              >
                <MediumBox
                  icon={
                    <ReceiptText
                      size={27}
                      color={Colors.lightPrimary}
                      variant="Bold"
                    />
                  }
                  title={"My Transactions"}
                  subtitle={"Monitor your financial activity"}
                />
              </Link>
              <MediumBox
                onPress={toggleModal}
                icon={
                  <Reserve
                    size={27}
                    color={Colors.lightPrimary}
                    variant="Bold"
                  />
                }
                title={"Help Desk"}
                subtitle={"Get support when you need it"}
              />
            </View>
          </View>

          <View>{/* <Banner width={"100%"} /> */}</View>
        </View>
      </View>

      <CenterModal
        isVisible={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        title="Deposit"
        buttons={false}
      >
        <View
          style={{
            height: 80,
            width: 80,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.lightBg,
            borderRadius: 40,
            alignSelf: "center",
          }}
        >
          <Bank
            size={40}
            color={Colors.lightPrimary}
          />
        </View>
        <StyledText
          type="subheading"
          variant="semibold"
          style={{ marginVertical: 15, textAlign: "center" }}
        >
          Bank Transfer
        </StyledText>
        <StyledText
          type="body"
          style={{ marginVertical: 15 }}
          style={{ textAlign: "center", opacity: 0.8, marginBottom: 30 }}
        >
          Send money to the bank account details below {"\n"}
          {`Please note that there is a ${amountFormatter.format(
            100
          )} charge for Wallet Top-up`}
        </StyledText>

        <View style={{ marginBottom: 20 }}>
          {virtualAccount.map((account, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderWidth: 0.5,
                borderColor: Colors.border,
                padding: 10,
                borderRadius: 10,
                gap: 10,
              }}
            >
              <View>
                <StyledText
                  variant="medium"
                  color={Colors.lightPrimary}
                >
                  {account.virtualAccountNo}
                </StyledText>
                <StyledText color={Colors.light}>
                  {account.virtualAccountName}
                </StyledText>
                <StyledText variant="medium">
                  {account.virtualAccountBankName
                    ? account.virtualAccountBankName
                    : "Rand Merchant Bank"}
                </StyledText>
              </View>

              <Copy
                size={25}
                color={Colors.lightPrimary}
                onPress={async () => {
                  await copyToClipboard(account?.virtualAccountNo);
                  setIsDepositModalOpen(false);
                }}
              />
            </View>
          ))}
        </View>
      </CenterModal>
      <CenterModal
        isVisible={isWithdrawModalOpen}
        onClose={() => !isSubmitting && setIsWithdrawModalOpen(false)}
        title="Withdraw"
        primaryButtonText="Withdraw"
        onPrimaryPress={() => formikRef.current?.handleSubmit()}
      >
        <Formik
          innerRef={formikRef}
          initialValues={{ amount: "" }}
          onSubmit={async (values) => {
            setIsSubmitting(true);
            const { amount } = values;
            console.log(values);

            await withdrawalRequest(amount);
            setIsSubmitting(false);
          }}
        >
          {({ handleChange }) => (
            <AppTextField
              name="amount"
              onChangeText={handleChange("amount")}
              label="Amount"
            />
          )}
        </Formik>
      </CenterModal>
    </LayeredScreen>
  );
};

export default index;
