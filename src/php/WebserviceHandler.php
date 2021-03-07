<?php

// barebones webservice handler

class WebserviceHandler
{
    private $setJsonData;

    public function __construct()
    {
        $this->setJsonData();
    }

    public function handleRequest()
    {
        $this->sendHeaders();

        $actionData = $this->getActionData($_GET['action']);
        $this->{$actionData['action']}($actionData);
    }

    private function getJsonPath()
    {
        return __DIR__ . '/../data/testdata.json';
    }

    private function setJsonData()
    {
        $this->jsonData = json_decode(file_get_contents($this->getJsonPath()), true);
    }

    private function saveJsonData()
    {
        file_put_contents($this->getJsonPath(), json_encode($this->jsonData, JSON_PRETTY_PRINT));
    }

    private function sendHeaders()
    {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
    }

    private function getNormalizedKey($name)
    {
        return trim(preg_replace('@[^a-z]+@i', '_', strtolower($name)));
    }

    private function getActionData($action)
    {
        $availableActionsToParamsReqiredMap = [
            'getSetting' => ['name'],
            'setSetting' => ['name', 'value'],
            'getNodes' => [],
            'setNodesCollapsedState' => [],
        ];

        if (!isset($availableActionsToParamsReqiredMap[$action])) {
            exit('placeholder response -- invalid action');
        }



        // check params, merge action data.
        $paramsReqired = $availableActionsToParamsReqiredMap[$action];
        $paramsReqired[] = 'action';

        $actionData = array_intersect_key($_GET, array_flip($paramsReqired));

        if (count($paramsReqired) !== count($actionData)) {
            exit('placeholder response -- invalid params');
        }

        return $actionData;
    }

    private function getNodes()
    {
        echo json_encode($this->jsonData['nodes'], JSON_PRETTY_PRINT);
    }

    private function getSetting($actionData)
    {
        $settingNameKey = $this->getNormalizedKey($actionData['name']);

        $settingsByNameKey = [];
        foreach ($this->jsonData['settings'] as $setting) {
            $settingsByNameKey[$this->getNormalizedKey($setting['name'])] = $setting;
        }

        echo json_encode($settingsByNameKey[$settingNameKey]['value'], JSON_PRETTY_PRINT);
    }

    private function setSetting($actionData)
    {
        $settingNameKey = $this->getNormalizedKey($actionData['name']);
        $settingVal = (bool) $actionData['value'];

        $settingsByNameKey = [];
        foreach ($this->jsonData['settings'] as $setting) {
            $settingsByNameKey[$this->getNormalizedKey($setting['name'])] = $setting;
        }

        $settingsByNameKey[$settingNameKey]['value'] = $settingVal;
        $this->jsonData['settings'] = array_values($settingsByNameKey);

        $this->saveJsonData();
    }

    private function setNodesCollapsedState($actionData)
    {
        // because you can't access the post data from the post array using the php internal web server. ffs
        $postBody = file_get_contents('php://input');
        $postBody = json_decode($postBody, true);
        $nodeIdToCollapsedStateMap = $postBody['nodeIdToCollapsedStateMap'];

        foreach (array_keys($this->jsonData['nodes']) as $key) {
            $this->jsonData['nodes'][$key]['collapsed'] = $nodeIdToCollapsedStateMap[$this->jsonData['nodes'][$key]['id']];
        }

        $this->jsonData['nodes'] = $this->jsonData['nodes'];

        $this->saveJsonData();
    }
}