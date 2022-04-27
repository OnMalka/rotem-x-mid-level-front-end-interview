import { useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

type Props = {
    mainVariant: string, 
    mainText: string, 
    yesVariant: string, 
    noVariant: string,
    PerformAction: ()=>void,
    onClickNo?: ()=>void
};

const ButtonWithPopoverVerification = ({mainVariant, mainText, yesVariant, noVariant, PerformAction, onClickNo}: Props) => {
    const [showVerifyDelete, setShowVerifyDelete] = useState(false);

    const onClickYes = () => {
        setShowVerifyDelete(false);
        PerformAction();
    };
    
    return (
        <OverlayTrigger
            trigger="click"
            key='top'
            placement='top'
            show={showVerifyDelete}
            onToggle={()=>setShowVerifyDelete(!showVerifyDelete)}
            overlay={
                <Popover id='popover-positioned-top'>
                <Popover.Header as="h3">Are You Sure?</Popover.Header>
                <Popover.Body>
                    <Button variant={yesVariant} onClick={onClickYes}>Yes</Button>
                    <Button variant={noVariant} onClick={()=>{setShowVerifyDelete(false); if(onClickNo)onClickNo();}}>No</Button>
                </Popover.Body>
                </Popover>
            }
            >
            <Button variant={mainVariant}>{mainText}</Button>
        </OverlayTrigger>
    );
};

export default ButtonWithPopoverVerification;